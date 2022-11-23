const Joi = require('@hapi/joi')

const Schema = Joi.object({
    name: Joi.string()
        .pattern(new RegExp(/^[\w-]+\.[a-z]+$/)),
})

exports.create = function(data) {
  return Schema.validate(data)
}