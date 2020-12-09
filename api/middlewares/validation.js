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
    userName: joi.string().regex(/^[a-z A-Z]+$/).min(2).required()
        .error(() => "Invalid Name!"),
    email: joi.string().email().required()
        .error(() => "Invalid Email!"),
    password: joi.string().min(8).required()
        .error(() => "Invalid Password!"),
    address: joi.string().required()
        .error(() => "Invalid Address!"),
});

const validateSignUp = (req, res, next) => {

    const userFormData = req.body;

    const isValid = joi.validate(userFormData, signUpSchema);
    //console.log(isValid);

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
    validateSignUp
}