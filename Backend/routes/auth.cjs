const express = require('express');
const { User, validateUser, validateUserDetails, validateUserPassword, validateUserResetToken } = require('../models/user.cjs');
const auth = require('../middleware/auth.cjs');
const { Token } = require('../models/token.cjs');
const { transport } = require('../utils/email.cjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const router = express.Router();

router.post('/auth', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(200).json({ exists: false });

        res.json({ exists: true, email: user.email });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/auth/signup', async (req, res) => {
    try {
        const { error } = validateUserDetails(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const hashpassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword,
        });

        await user.save();

        const refreshToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' }       //expiry for JWT
        )

        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_SECRET,
            { expiresIn: '15m' }
        )

        await Token.create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),     //expiry for MongoDB
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: "/"
        })

        res.status(201).json({
            message: "User registered successfully", token: accessToken, user: {
                id: user._id,
                email: user.email,
                name: user.username
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/auth/login', async (req, res) => {
    try {
        const { error } = validateUserPassword(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.authProvider === 'google' && !user.password) {
            return res.status(400).json({ message: "This account uses Google login. Set a password first." });
        }

        const validPassword = bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid password" });

        const refreshToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' }       //expiry for JWT
        )

        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_SECRET,
            { expiresIn: '15m' }
        )

        await Token.create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),     //expiry for MongoDB
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: "/"
        })

        res.json({
            message: "Login successful", token: accessToken, user: {
                id: user._id,
                email: user.email,
                name: user.username
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/auth/refresh', async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: "Refresh token missing" });

        const storedToken = await Token.findOne({ token });
        if (!storedToken) return res.status(403).json({ message: "Invalid refresh token" });

        jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                await Token.deleteOne({ token });
                return res.status(403).json({ message: "Expired refresh token" });
            }

            const user = await User.findById(decoded.userId);
            if (!user) return res.status(404).json({ message: "User not found" });

            const newAccessToken = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.ACCESS_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken: newAccessToken });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/auth/logout', auth, async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (token) {
            await Token.deleteOne({ token });
        }
        res.clearCookie('refreshToken');

        res.json({ message: "Logged out successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/auth/forgot-password', async (req, res) => {
    try {

        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { email } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ message: "User not found" });
        // if (user.authProvider === "google") return res.status(404).json({ message: "you're a google user,setup a password first" });

        const resetToken = crypto.randomBytes(32).toString('hex');

        Token.create({
            user: user._id,
            token: resetToken,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        });

        const resetlink = `http://localhost:5173/auth/reset?token=${resetToken}`;

        await transport.sendMail({
            from: `"Grow-Genie" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset.</p>
                   <p><a href="${resetlink}">Click here to reset your password</a></p>
                   <p>This link will expire in 15 minutes.</p>`,
        })

        res.json({ message: "Password reset link sent to email" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/auth/reset-password', async (req, res) => {
    try {

        const { error } = validateUserResetToken(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { token, password } = req.body;

        const record = await Token.findOne({ token });
        if (!record || record.expiresAt < new Date()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        };

        const hashpassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(record.user, { password: hashpassword });
        await Token.deleteOne({ token });

        res.json({ message: "Password reset successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.post('/auth/google', async (req, res) => {
    try {

        const { token } = req.body;

        const googleRes = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const payload = await googleRes.json();

        const { name, email, sub } = payload;

        if (!email) return res.status(401).json({ message: "Invalid Google token" });

        let user = await User.findOne({ email: email });

        if (!user) {
            user = await User.create({
                username: name,
                email: email,
                googleId: sub,
                authProvider: 'google'
            });
        } else if (!user.googleId) {
            user.googleId = sub;
            user.authProvider = 'google';
            await user.save();
        }

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' }       //expiry for JWT
        )

        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_SECRET,
            { expiresIn: '15m' }
        )

        await Token.create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),     //expiry for MongoDB
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: "/"
        })

        res.json({
            message: "Login successful", token: accessToken, user: {
                id: user._id,
                name: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/auth/set-password', async (req, res) => {
    const { password } = req.body;

    const hash = bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.user.userId, {
        password: hash,
        authProvider: 'local',
    });

    res.json({ message: "Password set successfully" });
});

router.get("/auth/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(400).json({ message: "User not found" });
        res.json({
            user: {
                id: user._id,
                email: user.email,
                name: user.username,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
})


module.exports = router;