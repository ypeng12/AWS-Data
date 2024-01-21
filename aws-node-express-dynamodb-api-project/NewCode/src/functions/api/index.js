import * as routes from './routes'
import app from '../../app'
import { ingestLogger } from '../utils'
import serverless from 'serverless-http'

app.get('/hello', ingestLogger, routes.hello)

export const severlessApp = serverless(app)
