const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const verify = require('./verifyToken');
const { questionValidation } = require('../validation');

router.get('/questions', verify, async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/add', async (req, res) => {
    // Validation
    const { error } = questionValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // New Question
    const question = new Question({
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer,
        slot: req.body.slot
    });
    try {
        const savedQuestion = await question.save();
        res.json({ error: null, question: savedQuestion });
    } catch (err) {
        res.json({ error: err });
    }
});

// Get A Specific Question
router.get('/check/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        res.status(200).json({ answer: question.answer });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// // Delete Post
// router.delete('/:questionId', async (req, res) => {
//     try {
//         const removedPost = await Post.deleteOne({ _id: req.params.questionId });
//         res.json(removedPost);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// // Update Post
// router.patch('/:questionId', async (req, res) => {
//     try {
//         const updatedPost = await Post.updateOne(
//             { _id: req.params.questionId },
//             { $set: { title: req.body.title } }
//         );
//         res.json(updatedPost);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

module.exports = router;
