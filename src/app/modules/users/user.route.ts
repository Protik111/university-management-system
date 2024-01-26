import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createStudent,
)

router.post('/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculy
)

router.post('/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
)

export const UserRoutes = router
