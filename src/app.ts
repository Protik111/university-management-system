import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import routes from './app/routes'

const app: Application = express()

app.use(cors())
app.use(cookieParser())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1', routes)

// testing api
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working')
//   // throw new ApiError(400, 'Custom Error')
//   Promise.reject(new Error('Unhadle promise rejection'))
// })

//global error handler
app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
