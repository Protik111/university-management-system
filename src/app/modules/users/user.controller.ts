import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: 'Failed to create User',
    // })

    next(error)
  }
}

export const UserController = {
  createUser,
}
