const { default: validator } = require('validator');
const Validator = require('validator');
const validText = require('./valid-text');

const validateLoginInput = data => {
    let errors = {};

    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";

    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid. Please enter a valid email."
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Email is required.";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Password is required.";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};

module.exports = validateLoginInput;