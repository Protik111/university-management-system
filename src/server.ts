import mongoose from 'mongoose'
import app from './app'
import config from './config'
import logger from './shared/logger'

async function bootstrapApp() {
  try {
    await mongoose.connect(config.db_connection as string)
    logger.info('Database is connected.')

    app.listen(config.port, () => {
      logger.info(`Server is listening to ${config.port}`)
    })
  } catch (error) {
    logger.error('Failed to connect', error)
  }
}

bootstrapApp()
