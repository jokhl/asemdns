const Joi = require('@hapi/joi')

// TODO: Enhance these conditions
const Schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp(/^[\S]{3,30}$/)),

    password_confirmation: Joi.ref('password'),
})
    .with('password', 'password_confirmation')

exports.create = function(data) {
  return Schema.validate(data)
}