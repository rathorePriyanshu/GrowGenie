const express = require('express');
const { OTP, validateSendOTP, validateVerifyOTP } = require('../models/otp.cjs');
const { transport } = require('../utils/email.cjs');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/otp', async (req, res) => {
    try {
        const { error } = validateSendOTP(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOTP = await bcrypt.hash(otp, 10);
        const expiresAT = new Date(Date.now() + 5 * 60 * 1000);

        const otpDoc = await OTP.create({
            email: req.body.email,
            code: hashedOTP,
            expiresAt: expiresAT,
            purpose: "verification",
        })

        await transport.sendMail({
            from: `"Grow-Genie" <${process.env.EMAIL_USER}>`,
            to: req.body.email,
            subject: "Your Verification Code",
            html: `<h2>Your OTP code is ${otp}</h2>. <p>It is valid for 5 minutes only, please do not share it with anyone.</p>`,
        });

        res.json({ message: "OTP sent to email", verificationId: otpDoc._id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "something went wrong" });
    }
})

router.post('/otp/verify', async (req, res) => {
    try {
        console.log("RAW BODY:", req.body);
        const { error } = validateVerifyOTP(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await OTP.findById(req.body.verificationId);
        if (!user) return res.status(404).json({ message: "Invalid OTP or email" });

        if (user.expiresAt < new Date()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        const isValid = await bcrypt.compare(req.body.code, user.code);
        if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

        const token = jwt.sign(
            { verified: true, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '10m' }
        )

        res.json({ message: "OTP verified successfully", signupToken: token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "something went wrong" });
    }
})

module.exports = router;