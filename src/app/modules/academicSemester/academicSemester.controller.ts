import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    )

    res.status(201).json({
      success: true,
      message: 'Academic semester created successfully',
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

export const AcademicSemesterController = {
  createSemester,
}
