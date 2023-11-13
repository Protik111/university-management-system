import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { StudentController } from './student.controller'
import { StudentValidaion } from './student.validation'
const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)
router.delete('/:id', StudentController.deleteStudent)

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent,
)
router.get('/', StudentController.getAllStudents)

export const StudentRoutes = router
