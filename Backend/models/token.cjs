const mongoose = require('mongoose');
const { User } = require('./user.cjs');
const Joi = require('joi');

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    token: {
        type: String,
        required: true,
        unique: true,
    },

    device: {
        type: String,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    }
});

const Token = mongoose.model('Token', tokenSchema);

function validateTokenSchema(token) {
    const schema = Joi.object({
        token: Joi.string().required(),
    });
    return schema.validate(token);
}

module.exports.Token = Token;
module.exports.validateTokenSchema = validateTokenSchema;