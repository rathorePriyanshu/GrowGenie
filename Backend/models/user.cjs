const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === 'local';
        },
        minLength: 8,
        maxlength: 128
    },
    googleId: {
        type: String,
        default: null,
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        required: true,
        default: "local"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false,
        required: true,
    }

});

const User = mongoose.model('User', userSchema);

function validateUserDetails(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
        password: Joi.string().min(8).max(128).required(),
    });

    return schema.validate(user);
}

function validateUserPassword(user) {
    const schema = Joi.object({
        email: Joi.string().email().required().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
        password: Joi.string().min(8).max(128).required(),
    })

    return schema.validate(user);
}

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().email().required().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
    })

    return schema.validate(user);
}

function validateUserResetToken(user) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(8).max(128).required(),
    })
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUserDetails = validateUserDetails;
module.exports.validateUser = validateUser;
module.exports.validateUserPassword = validateUserPassword;
module.exports.validateUserResetToken = validateUserResetToken;