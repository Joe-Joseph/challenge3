import Joi from 'joi'

function validateUser (user) {
  const userSchema = {
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }
  return Joi.validate(user, userSchema)
}

export default validateUser