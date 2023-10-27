import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { academicSemesterFilterableFields } from './academicSemester.constants'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    )

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    })

    next()
  },
)

const getAllSemesters: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions,
    )

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully!',
      meta: result.meta,
      data: result.data,
    })

    // next()
  },
)

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
}
