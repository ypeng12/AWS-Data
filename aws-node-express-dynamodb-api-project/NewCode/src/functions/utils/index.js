import * as _ from 'lodash-core'
import loggerUntil from './logger'


// eslint-disable-next-line
export const ingestLogger = (req, res, next) => {
  const requestId = _.get(req.apiGateway, 'context.awsRequestId', '')
  const path = _.get(req.apiGateway, 'event.resource', '')
  req.logger = loggerUntil(requestId, path)
  return next()
}
