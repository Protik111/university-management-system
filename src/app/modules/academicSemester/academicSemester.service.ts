import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { academicSemesterFilterableFields, academicSemesterTitleCodeMapper } from './academicSemester.constants'
import { IAcademicSemester, IAcademicSemesterFilters } from './academicSemester.interface'
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

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $option: 'i'
        }
      }))
    })
  }

  if (Object.values(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    })
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
}
