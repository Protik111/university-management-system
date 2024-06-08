import initAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.events'
import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.events'
import initAcademicSemesterEvents from '../modules/academicSemester/academicSemester.events'

const subscribeToEvents = () => {
  initAcademicSemesterEvents()
  initAcademicDepartmentEvents()
  initAcademicFacultyEvents()
}

export default subscribeToEvents
