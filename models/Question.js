const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    answer: {
        type: Number,
        required: true
    },
    slot: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Questions', QuestionSchema);
