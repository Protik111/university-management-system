import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import routes from './app/routes'

const app: Application = express()

app.use(cors())

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

export default app
