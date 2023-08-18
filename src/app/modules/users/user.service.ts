import config from '../../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const id = await generateUserId()
    user.id = id

    if (!user.password) {
      user.password = config.default_student_pass as string
    }

    const createdUser = await User.create(user)
    if (!createdUser) {
      throw new Error('Failed to create user!')
    }

    return createdUser
  } catch (error) {
    console.error('Error creating user:', error)
    throw error // Rethrow the error to be caught higher up the call stack if needed
  }
}

export default {
  createUser,
}