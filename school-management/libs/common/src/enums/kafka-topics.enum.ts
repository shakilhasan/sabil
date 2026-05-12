export enum KafkaTopic {
  // Auth
  AUTH_LOGIN = 'auth.login',
  AUTH_REGISTER = 'auth.register',
  AUTH_VALIDATE_TOKEN = 'auth.validate-token',
  AUTH_REFRESH_TOKEN = 'auth.refresh-token',

  // Tenant
  TENANT_CREATE = 'tenant.create',
  TENANT_FIND_ALL = 'tenant.find-all',
  TENANT_FIND_ONE = 'tenant.find-one',
  TENANT_UPDATE = 'tenant.update',
  TENANT_DELETE = 'tenant.delete',

  // Student
  STUDENT_CREATE = 'student.create',
  STUDENT_FIND_ALL = 'student.find-all',
  STUDENT_FIND_ONE = 'student.find-one',
  STUDENT_UPDATE = 'student.update',
  STUDENT_DELETE = 'student.delete',

  // Teacher
  TEACHER_CREATE = 'teacher.create',
  TEACHER_FIND_ALL = 'teacher.find-all',
  TEACHER_FIND_ONE = 'teacher.find-one',
  TEACHER_UPDATE = 'teacher.update',
  TEACHER_DELETE = 'teacher.delete',

  // Class
  CLASS_CREATE = 'class.create',
  CLASS_FIND_ALL = 'class.find-all',
  CLASS_FIND_ONE = 'class.find-one',
  CLASS_UPDATE = 'class.update',
  CLASS_DELETE = 'class.delete',

  // Subject
  SUBJECT_CREATE = 'subject.create',
  SUBJECT_FIND_ALL = 'subject.find-all',
  SUBJECT_FIND_ONE = 'subject.find-one',
  SUBJECT_UPDATE = 'subject.update',
  SUBJECT_DELETE = 'subject.delete',

  // Semester
  SEMESTER_CREATE = 'semester.create',
  SEMESTER_FIND_ALL = 'semester.find-all',
  SEMESTER_FIND_ONE = 'semester.find-one',
  SEMESTER_UPDATE = 'semester.update',
  SEMESTER_DELETE = 'semester.delete',

  // Timetable
  TIMETABLE_CREATE = 'timetable.create',
  TIMETABLE_FIND_ALL = 'timetable.find-all',
  TIMETABLE_FIND_ONE = 'timetable.find-one',
  TIMETABLE_UPDATE = 'timetable.update',
  TIMETABLE_DELETE = 'timetable.delete',

  // Exam
  EXAM_CREATE = 'exam.create',
  EXAM_FIND_ALL = 'exam.find-all',
  EXAM_FIND_ONE = 'exam.find-one',
  EXAM_UPDATE = 'exam.update',
  EXAM_DELETE = 'exam.delete',

  // Result
  RESULT_CREATE = 'result.create',
  RESULT_FIND_ALL = 'result.find-all',
  RESULT_FIND_ONE = 'result.find-one',
  RESULT_UPDATE = 'result.update',
  RESULT_DELETE = 'result.delete',
  RESULT_RANKINGS = 'result.rankings',
}
