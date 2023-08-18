import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userRoutes from '../src/app/modules/users/user.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Working')
})

export default app
