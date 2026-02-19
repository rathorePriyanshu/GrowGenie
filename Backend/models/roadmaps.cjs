const { required } = require("joi");
const mongoose = require("mongoose");
const Joi = require("joi");

const roadmapSchema = new mongoose.Schema({
    career_id: {
        type: String,
        required: true
    },
    career_name: {
        type: String,
        required: true
    },
    career_source: {
        type: String,
        enum: ["prefilled", "ai"],
        required: true
    },
    country: {
        type: String,
        required: true,
        default: "India"
    },
    version: {
        type: Number,
        default: 1
    },
    roadmap_json: {
        type: Object,
        required: true
    },
    generatedBy: {
        type: String,
        enum: ["ai", "admin"],
        default: "ai"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

roadmapSchema.index({ career_id: 1, country: 1, version: 1 }, { unique: true });

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

function validateRoadmap(roadmap) {
    const schema = Joi.object({
        career_id: Joi.string().trim().required(),
        career_name: Joi.string().trim().required(),
        career_source: Joi.string().valid("prefilled", "ai").required(),
    })

    return schema.validate(roadmap);
}

module.exports.Roadmap = Roadmap;
module.exports.validateRoadmap = validateRoadmap;