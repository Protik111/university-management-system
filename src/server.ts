import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrapApp() {
  try {
    await mongoose.connect(config.db_connection as string)
    console.log('Database is connected.')

    app.listen(config.port, () => {
      console.log(`Server is listening to ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to connect', error)
  }
}

bootstrapApp()
