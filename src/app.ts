import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', UserRoutes)

//testing api
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working')
//   throw new ApiError(400, 'Custom Error')
// })

//global error handler
app.use(globalErrorHandler)

export default app
