// permissions/constants.ts
export const PERMISSIONS = {
  CAMPUS_FEATURE: 'Campus Feature',
  SCHOOL_RULES: 'School Rules',
  ROLES_PERMISSIONS: 'Roles & Permissions',
  SCHOOL_ADMINISTRATION: 'School Administration',
  STUDENT_MANAGEMENT: 'Student Management',
  TEACHER_MANAGEMENT: 'Teacher Management',
  LESSON_SETTING: 'Lesson Setting',
  STUDENT_ACHIEVEMENT: 'Student Achievement'
} as const

// Create type from permissions constant
export type PermissionName = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]
