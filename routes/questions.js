const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const verify = require('./verifyToken');
const { questionValidation } = require('../validation');

router.get('/questions', verify, async (req, res) => {
    try {
        const questions = await Question.find();
        Question.res.json(questions);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/question/:slot', async (req, res) => {
    try {
        const count = await Question.countDocuments({
            slot: req.params.slot
        });
        const random = Math.floor(Math.random() * count);
        const question = await Question.find({ slot: req.params.slot })
            .limit(1)
            .skip(random);
        res.status(200).json(question);
    } catch (err) {
        res.status(400).json({ error: err });
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

router.get('/checkanswer/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        res.status(200).json({ answer: question.answer });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.get('/lifelines/audiencepoll/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        if (question.slot <= 40000)
            options = audiencePoll(question.answer - 1, 50);
        else if (question.slot <= 320000)
            options = audiencePoll(question.answer - 1, 30);
        else options = audiencePoll(question.answer - 1, 10);
        const data = {
            option1: options[0],
            option2: options[1],
            option3: options[2],
            option4: options[3]
        };
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});

// function audiencePoll(answer) {
//     let options = [0, 0, 0, 0];
//     options[answer] = Math.floor(Math.random() * 50) + 50;
//     let total = options[answer];
//     for (i = 0, j = 0; i < 4; i++) {
//         if (j == 2) {
//             if (answer == 2) i++;
//             options[i] = 100 - total;
//             total += options[i];
//             if (answer == 3) i++;
//         } else if (i != answer) {
//             let random = Math.floor(Math.random() * (100 - total));
//             options[i] = random;
//             total += random;
//             j++;
//         }
//     }
//     return options;
// }

function audiencePoll(answer, value) {
    let options = [0, 0, 0, 0];
    options[answer] = Math.floor(Math.random() * 50) + value;
    let total = options[answer];
    for (let i = 0; i < 3; i++) {
        let zeroAt = options.indexOf(0);
        if (i == 2) options[zeroAt] = 100 - total;
        else {
            options[zeroAt] = Math.floor(Math.random() * (100 - total));
            total += options[zeroAt];
        }
    }
    return options;
}

router.get('/lifelines/fiftyfifty/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        let randomOption1 = Math.floor(Math.random() * 4) + 1;
        while (randomOption1 == question.answer)
            randomOption1 = Math.floor(Math.random() * 4) + 1;
        let randomOption2 = Math.floor(Math.random() * 4) + 1;
        while (
            randomOption2 == question.answer ||
            randomOption2 == randomOption1
        )
            randomOption2 = Math.floor(Math.random() * 4) + 1;
        res.status(200).json({
            remove1: randomOption1,
            remove2: randomOption2
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});

router.get('/lifelines/flipthequestion/:questionId/:slot', async (req, res) => {
    try {
        const count = await Question.countDocuments({
            slot: req.params.slot
        });
        const random = Math.floor(Math.random() * (count - 1));
        const question = await Question.find({
            _id: { $not: { $in: req.params.questionId } },
            slot: req.params.slot
        })
            .limit(1)
            .skip(random);
        res.status(200).json(question);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});

router.get('/lifelines/asktheexpert/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        const random = Math.floor(Math.random() * 100);
        if (random > 20) {
            // Return correct answer
            res.status(200).json({ answer: question.answer });
        } else {
            // Return any random answer -> Maybe correct or incorrect
            const randomAnswer = Math.floor(Math.random() * 4) + 1;
            res.status(200).json({ answer: randomAnswer });
        }
    } catch (err) {
        console.log(err);
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
