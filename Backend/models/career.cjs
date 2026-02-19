const { string } = require("joi");
const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
    career_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        enum: ["Science", "Commerce", "Arts"],                         // restrict to valid streams
        required: true
    },
    avgSalary: {
        type: String,
        required: true
    },
    source: {
        type: String,
        enum: ["prefilled"],
        default: "prefilled"
    },
    img: {
        type: String,                                                          // single image URL
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Export model
const Career = mongoose.model("Career", careerSchema);
module.exports = Career;
