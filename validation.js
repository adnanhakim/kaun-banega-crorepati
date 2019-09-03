const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    return Joi.validate(data, schema);
};

const loginValidation = data => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    return Joi.validate(data, schema);
};

const questionValidation = data => {
    const schema = {
        question: Joi.string()
            .min(1)
            .max(255)
            .required(),
        option1: Joi.string()
            .min(1)
            .max(127)
            .required(),
        option2: Joi.string()
            .min(1)
            .max(127)
            .required(),
        option3: Joi.string()
            .min(1)
            .max(127)
            .required(),
        option4: Joi.string()
            .min(1)
            .max(127)
            .required(),
        answer: Joi.number()
            .integer()
            .min(1)
            .max(4)
            .required(),
        slot: Joi.number()
            .integer()
            .required()
    };

    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.questionValidation = questionValidation;
