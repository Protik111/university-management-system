import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    console.log('user', user)
    const result = await userService.createUser(user)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create User',
    })
  }
}

export default {
  createUser,
}
