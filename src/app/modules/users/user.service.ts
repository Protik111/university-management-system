import config from '../../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const academicSemesterInfo = {
    code: '01',
    year: '2025',
  }
  const id = await generateStudentId(academicSemesterInfo)
  user.id = id

  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to create user!')
  }

  return createdUser
}

export const UserService = {
  createUser,
}
