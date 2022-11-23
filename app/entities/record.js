const Joi = require('@hapi/joi')

const TYPES = ["A", "AAAA", "CAA", "CNAME", "MX", "NAPTR", "NS", "SRV", "TXT"]

const Schema = Joi.object({
    hostname: Joi.string()
        .pattern(new RegExp(/^[\w-]*$/)),
    type: Joi.any().valid(...TYPES).required(),
    value: Joi.string()
        .pattern(new RegExp(/^[\S-]+$/)),
})

exports.create = function(data) {
  return Schema.validate(data)
}

exports.TYPES = TYPES