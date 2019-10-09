const Validator = require('@hapi/joi');

const formValidate = (data) => {
    const schema = Validator.object({
        email: Validator.string()
            .min(6).
            max(200).
            required(),
        password: Validator.string()
            .min(6)
            .max(1000)
            .required()
    });

    return schema.validate(data);
};

module.exports.formValidate = formValidate;