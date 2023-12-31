import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User created successfully',
      data: result,
    })
  },
)

export const UserController = {
  createStudent,
}
