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
        if (question.answer == 1) {
            let option1 = Math.floor(Math.random() * 100);
            if (option1 < 50) option1 += 50;
            let total = option1;
            let option2 = Math.floor(Math.random() * 100);
            while (option2 + total > 100) {
                option2 = Math.floor(Math.random() * 100);
            }
            total = total += option2;
            let option3 = Math.floor(Math.random() * 100);
            while (option3 + total > 100) {
                option3 = Math.floor(Math.random() * 100);
            }
            total = total += option3;
            let option4 = 100 - total;
            const data = bind(option1, option2, option3, option4);
            res.status(200).json(data);
        } else if (question.answer == 2) {
            let option2 = Math.floor(Math.random() * 100);
            if (option2 < 50) option2 += 50;
            let total = option2;
            let option1 = Math.floor(Math.random() * 100);
            while (option1 + total > 100) {
                option1 = Math.floor(Math.random() * 100);
            }
            total = total += option1;
            let option3 = Math.floor(Math.random() * 100);
            while (option3 + total > 100) {
                option3 = Math.floor(Math.random() * 100);
            }
            total = total += option3;
            let option4 = 100 - total;
            const data = bind(option1, option2, option3, option4);
            res.status(200).json(data);
        } else if (question.answer == 3) {
            // let option3 = Math.floor(Math.random() * 100);
            // if (option3 < 50) option3 += 50;
            // let total = option3;
            // let option1 = Math.floor(Math.random() * 100);
            // while (option1 + total > 100) {
            //     option1 = Math.floor(Math.random() * 100);
            // }
            // total = total += option1;
            // let option2 = Math.floor(Math.random() * 100);
            // while (option2 + total > 100) {
            //     option2 = Math.floor(Math.random() * 100);
            // }
            // total = total += option2;
            // let option4 = 100 - total;
            // const data = bind(option1, option2, option3, option4);
            // res.status(200).json(data);
            const options = audiencePoll(1);
            console.log(options);

            const data = bind(options[0], options[1], options[2], options[3]);
            res.status(200).json(data);
        } else {
            let option4 = Math.floor(Math.random() * 100);
            if (option4 < 50) option4 += 50;
            let total = option4;
            let option1 = Math.floor(Math.random() * 100);
            while (option1 + total > 100) {
                option1 = Math.floor(Math.random() * 100);
            }
            total = total += option1;
            let option2 = Math.floor(Math.random() * 100);
            while (option2 + total > 100) {
                option2 = Math.floor(Math.random() * 100);
            }
            total = total += option2;
            let option3 = 100 - total;
            const data = bind(option1, option2, option3, option4);
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});

function audiencePoll(answer) {
    let options = [0, 0, 0, 0];
    options[answer] = Math.floor(Math.random() * 100);
    if (options[answer] < 50) options[answer] += 50;
    console.log(options[answer]);
    let total = options[answer];
    for (i = 0, j = 0; i < 4; i++) {
        console.log(`${i}, ${j}, ${total}`);

        if (j == 2) {
            console.log(`J: ${i}, ${j}, ${total}`);
            options[i] = 100 - total;
            console.log(`Final Total: ${total}`);
        }
        if (i != answer) {
            let random = Math.floor(Math.random() * 100);
            while (total + random > 100)
                random = Math.floor(Math.random() * 100);
            options[i] = random;
            total += random;
            j++;
        }
    }
    return options;
}

function bind(op1, op2, op3, op4) {
    const data = {
        option1: op1,
        option2: op2,
        option3: op3,
        option4: op4
    };
    return data;
}

router.get('/lifelines/asktheexpert/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        const random = Math.floor(Math.random() * 100);
        if (random > 20) {
            // Return correct answer
            res.status(200).json({ expert: question.answer });
        } else {
            // Return any random answer -> Maybe correct or incorrect
            const randomAnswer = Math.floor(Math.random() * 4) + 1;
            res.status(200).json({ expert: randomAnswer });
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
