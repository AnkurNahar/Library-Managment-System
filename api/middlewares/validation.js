const joi = require("joi");

const sanitizeForm = (req, res, next) => {
    
    const body = req.body;

    for (let key in body) {

        if (typeof body[key] === "string") {
            body[key] = body[key].replace(/\s\s+/g, " "); // replace double spaces with single space
            body[key] = body[key].trim();
        }
    }

    return next();
}


const signUpSchema = joi.object({
    username: joi.string().regex(/^[a-z A-Z]+$/).min(2).required()
        .error(() => "Invalid Name!"),
    email: joi.string().email().required()
        .error(() => "Invalid Email!"),
    password: joi.string().min(8).required()
        .error(() => "Invalid Password! Password must have 8 characters"),
    librarian: joi.boolean()
        .error(() => "Invalid Status!"),
});

const signInSchema = joi.object({
    email: joi.string().email().required()
        .error(() => "Invalid Email!"),
    password: joi.string().min(8).required()
        .error(() => "Invalid Password!")
});

const bookSchema = joi.object({
    bookname: joi.string().required()
        .error(() => "Invalid Book Name!"),
    author: joi.string().required()
        .error(() => "Invalid Author Name!"),
    genre: joi.string()
        .error(() => "Invalid Genre!"),
    image: joi.string()
        .error(() => "Invalid Image URL!"),
    release: joi.date()
        .error(() => "Invalid Release date!")
});

const validateBook = (req, res, next) => {

    const userFormData = req.body;

    const isValid = joi.validate(userFormData, bookSchema);

    if (isValid.error) { 

        return res.status(400).json({
            msg: isValid.error.details[0].message
        });

    } else {
        return next();
    }
}

const validateSignIn = (req, res, next) => {

    const userFormData = req.body;

    const isValid = joi.validate(userFormData, signInSchema);

    if (isValid.error) { 

        return res.status(400).json({
            msg: isValid.error.details[0].message
        });

    } else {
        return next();
    }
}

const validateSignUp = (req, res, next) => {

    const userFormData = req.body;

    const isValid = joi.validate(userFormData, signUpSchema);

    if (isValid.error) { 

        return res.status(400).json({
            msg: isValid.error.details[0].message
        });

    } else {
        return next();
    }
}


module.exports = {
    sanitizeForm,
    validateSignUp,
    validateSignIn,
    validateBook
}