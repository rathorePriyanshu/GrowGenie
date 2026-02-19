const Joi = require("joi");
const mongoose = require("mongoose");

const userRoadmapSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    roadmap_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap",
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now()
    }
});

const UserRoadmap = mongoose.model("userRoadmap", userRoadmapSchema);

function validateUserRoadmap(userRoadmap) {
    const schema = Joi.object({
        roadmap_id: Joi.string().required()
    })
    return schema.validate(userRoadmap);
}

module.exports = { UserRoadmap, validateUserRoadmap };