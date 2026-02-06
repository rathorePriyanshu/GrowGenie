const mongoose = require('mongoose');
const joi = require('joi');
const { default: e } = require('express');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Invalid email format",
        }
    },
    code: {
        type: String,
        required: true,
        length: 6,
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0,
    },
    purpose: {
        type: String,
        enum: ["verification", "password_reset"],
        required: true,
    }
});

const OTP = mongoose.model('OTP', otpSchema);

function validateSendOTP(otp) {
    const OTPSendschema = joi.object({
        email: joi.string().email().required().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
    });

    return OTPSendschema.validate(otp);
}

function validateVerifyOTP(otp) {
    const OTPVerifySchema = joi.object({
        verificationId: joi.string().required(),
        code: joi.string().length(6).required(),
    })

    return OTPVerifySchema.validate(otp);
}

module.exports.OTP = OTP;
module.exports.validateSendOTP = validateSendOTP;
module.exports.validateVerifyOTP = validateVerifyOTP;