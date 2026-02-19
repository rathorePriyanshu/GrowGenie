const express = require('express');
const { Roadmap, validateRoadmap } = require('../models/roadmaps.cjs');
const { getRoadmapFromAI } = require('../utils/ai.cjs');
const { UserRoadmap, validateUserRoadmap } = require('../models/userRoadmap.cjs');
const auth = require('../middleware/auth.cjs');


const router = express.Router();

router.post("/roadmap", async (req, res) => {
    try {
        const { error, value } = validateRoadmap(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { career_id, career_name, career_source } = value;
        const country = "India";

        const existingRoadmap = await Roadmap.findOne({
            career_id,
            country
        }).sort({ version: -1 });

        console.log("Existing Roadmap:", existingRoadmap);

        if (existingRoadmap) {
            res.json(existingRoadmap);
            return;
        }

        const roadmapJSON = await getRoadmapFromAI(career_name, country);

        if (!roadmapJSON) {
            return res.status(500).json({ message: "Failed to generate roadmap try again later" });
        }

        let newRoadmap;
        try {
            newRoadmap = await Roadmap.create({
                career_id,
                career_name,
                career_source,
                country,
                version: 1,
                roadmap_json: roadmapJSON,
                generatedBy: "ai"
            });

        } catch (err) {
            if (err.code === 11000) {
                newRoadmap = await Roadmap.findOne({
                    career_id,
                    country
                }).sort({ version: -1 });
            } else {
                throw err;
            }
        }

        console.log("New Roadmap:", newRoadmap);
        res.json(newRoadmap);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
})

router.post("/roadmaps/save", auth, async (req, res) => {
    try {
        const { error, value } = validateUserRoadmap(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { roadmap_id } = value;

        const existingRoadmap = await Roadmap.findById(roadmap_id);
        if (!existingRoadmap) {
            return res.status(404).json({ message: "Roadmap not found" });
        }

        try {
            await UserRoadmap.create({
                user_id: req.user.userId,
                roadmap_id
            });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(409).json({ message: "Roadmap already saved by user" });
            }
            throw err;
        }

        return res.status(201).json({ message: "Roadmap saved successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/roadmaps", auth, async (req, res) => {
    try {

        const user_id = req.user.userId;

        const savedRoadmaps = await UserRoadmap.find({ user_id })
            .populate({
                path: "roadmap_id",
                select: "career_id career_name country version"
            }).sort({ savedAt: -1 });

        const response = savedRoadmaps
            .filter(item => item.roadmap_id) // Filter out entries where roadmap_id is null
            .map(item => ({
                roadmap_id: item.roadmap_id._id,
                career_id: item.roadmap_id.career_id,
                career_name: item.roadmap_id.career_name,
                country: item.roadmap_id.country,
                version: item.roadmap_id.version,
                savedAt: item.savedAt
            }))

        res.json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/roadmap/:id", auth, async (req, res) => {
    try {

        const id = req.params.id;
        if (!id) return res.status(400).json({ message: "Roadmap ID not found" });

        const roadmap = await Roadmap.findById(id);
        if (!roadmap) return res.status(400).json({ message: "Roadmap not found" });

        res.json(roadmap);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
})

router.delete("/roadmap/save/:id", auth, async (req, res) => {
    try {
        const roadmap_id = req.params.id;
        const user_id = req.user.userId;

        if (!roadmap_id) return res.status(400).json({ message: "Roadmap ID is required" });

        const deleted = await UserRoadmap.findOneAndDelete({
            user_id,
            roadmap_id
        });

        if (!deleted) return res.status(404).json({ message: "Saved Roadmap not found" });

        return res.json({ message: "Roadmap removed" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
})

module.exports = router;