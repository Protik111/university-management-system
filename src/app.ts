import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', UserRoutes)
app.use('/api/v1/semesters/', AcademicSemesterRoutes)

// testing api
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working')
//   // throw new ApiError(400, 'Custom Error')
//   Promise.reject(new Error('Unhadle promise rejection'))
// })

//global error handler
app.use(globalErrorHandler)

export default app
