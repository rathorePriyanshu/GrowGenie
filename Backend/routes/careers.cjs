const express = require('express');
const Career = require('../models/career.cjs');

const router = express.Router();


router.get("/careers", async (req, res) => {
    try {
        const { stream } = req.query;

        let query = {};
        if (stream) {
            const validStreams = ["Science", "Commerce", "Arts"];
            if (!validStreams.includes(stream)) {
                return res.status(400).json({ error: "Invalid stream name" });
            }
            query.stream = stream;
        }

        const careers = await Career.find(query);

        res.json(careers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;