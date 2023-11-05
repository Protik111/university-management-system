import config from '../../../config/index'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateFacultyId } from './user.utils'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  const id = await generateFacultyId()
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
  createStudent,
}
