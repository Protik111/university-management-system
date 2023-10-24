import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constants'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const createdSemester = await AcademicSemester.create(payload)
  return createdSemester
}

export const AcademicSemesterService = {
  createSemester,
}
