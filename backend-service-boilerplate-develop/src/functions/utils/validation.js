import * as _ from 'lodash-core'
import Validator from 'validatorjs'

const validateRequestProperty = _.curry(
  (property, validationRule, defaultValue) => (req, res, next) => {
    const value = {
      ...defaultValue,
      ..._.get(req, property)
    }
    const validation = new Validator(value, validationRule)
    req[property] = value
    if (validation.passes()) {
      return next()
    }
    return res.status(412).send(validation.errors)
  },
)

const withMultiValidation = (
  middleware,
  props = { body: {}, query: {}, params: {} },
  defaultProps = { body: {}, query: {}, params: {} },
) => {
  const middlewareArray = []

  const { body, query, params } = props
  if (!_.isEmpty(body)) {
    middlewareArray.push(validateRequestProperty('body', body, defaultProps.body))
  }

  if (!_.isEmpty(query)) {
    middlewareArray.push(validateRequestProperty('query', query, defaultProps.query))
  }

  if (!_.isEmpty(params)) {
    middlewareArray.push(validateRequestProperty('params', params, defaultProps.params))
  }

  middlewareArray.push(middleware)
  return middlewareArray
}

export {
  withMultiValidation,
}
