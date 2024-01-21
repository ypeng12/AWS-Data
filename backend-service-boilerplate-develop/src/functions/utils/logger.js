import { createLogger, format, transports } from 'winston'

const logger = (requestId, path) => createLogger({
  defaultMeta: {    
    requestId, 
    service: process.env.LOG_NAMESPACE,
    path,
  },
  level: 'info',
  transports: [new transports.Console()],
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
})

export default logger
