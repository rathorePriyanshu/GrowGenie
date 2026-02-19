const express = require('express');
const quizdata = require('../utils/data.cjs');
const auth = require("../middleware/auth.cjs");
const { enrichCareerData } = require("../utils/methods.cjs");
const Quiz = require("../models/quiz.cjs");
const { getAIFeedback, getCareerSuggestion } = require("../utils/ai.cjs");

const router = express.Router();

router.get('/quiz', auth, async (req, res) => {
    try {
        const { classLevel } = req.query;

        if (!classLevel) {
            return res.status(400).json({ error: "classLevel query parameter is required" })
        }

        const quizzes = await Quiz.find({ classLevel });

        const formatted = quizzes.map(q => ({
            id: q._id.toString(),
            classLevel: q.classLevel,
            question: q.question,
            options: q.options.map(opt => ({
                id: opt._id.toString(),
                text: opt.text,
                stream: opt.stream,
                skills: opt.skills
            }))
        }))

        res.json(formatted);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
})

router.post('/quiz/submit', auth, async (req, res) => {
    try {
        const { answers } = req.body;


        const quizIds = answers.map(a => a.questionId);
        const quizzes = await Quiz.find({ _id: { $in: quizIds } });


        const streamCount = { Science: 0, Commerce: 0, Arts: 0 };
        const allSkills = [];

        quizzes.forEach(q => {
            const selected = answers.find(a => a.questionId === q._id.toString());
            if (!selected) return;

            const option = q.options.id(selected.selectedOptionId);
            if (option) {
                streamCount[option.stream]++;
                allSkills.push(...option.skills);
            }
        });


        const recommendedStream = Object.keys(streamCount).reduce((a, b) =>
            streamCount[a] >= streamCount[b] ? a : b
        );

        const aiFeedback = await getAIFeedback(recommendedStream, allSkills);
        const careers = await getCareerSuggestion(recommendedStream, allSkills);

        const careerInfo = careers.map((career) => enrichCareerData(career));

        res.json({
            recommendedStream,
            topskills: allSkills.slice(0, 3),
            careers,
            aiFeedback,
            careerInfo,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;