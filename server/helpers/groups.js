import Joi from 'joi'

function validateGroup (group) {
  const groupSchema = {
    name: Joi.string().min(3).required(),
    role: Joi.string().min(3).required()
  }
  return Joi.validate(group, groupSchema)
}

export default validateGroup