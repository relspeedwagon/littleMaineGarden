const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('userName').isEmail(),
    body('email').exists(),
    body('password').isLength({ min: 8 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}