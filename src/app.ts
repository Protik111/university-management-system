import cors from 'cors'
import express, { Application } from 'express'
import userRoutes from '../src/app/modules/users/user.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', userRoutes)

// app.get('/', (req: Request, res: Response) => {
//   res.send('Working')
// })

//global error handler
app.use(globalErrorHandler)

export default app
