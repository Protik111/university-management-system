import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'
import { RedisClient } from './shared/redis'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function bootstrapApp() {
  try {
    await RedisClient.connect()
    await mongoose.connect(config.db_connection as string)
    logger.info('Database is connected.')

    app.listen(config.port, () => {
      logger.info(`Server is listening to ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect', error)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandle Rejection is detected, we are closing the server..')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrapApp()

process.on('SIGTERM', () => {
  logger.info('Sigterm is detected')
  if (server) {
    server.close()
  }
})
