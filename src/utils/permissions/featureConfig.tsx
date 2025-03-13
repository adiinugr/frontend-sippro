import type { FeatureConfig } from '@/utils/permissions'
import { PERMISSIONS } from '@/utils/permissions/constants'

// Vertical Menu Usage:
const viewSchoolAdmConfig: FeatureConfig = {
  requiredPermissions: [{ name: PERMISSIONS.SCHOOL_ADMINISTRATION, actions: ['read'] }]
}

const viewStudentManagementConfig: FeatureConfig = {
  requiredPermissions: [{ name: PERMISSIONS.STUDENT_MANAGEMENT, actions: ['read'] }]
}

const viewTeacherManagementConfig: FeatureConfig = {
  requiredPermissions: [{ name: PERMISSIONS.TEACHER_MANAGEMENT, actions: ['read'] }]
}

const viewLessonSettingConfig: FeatureConfig = {
  requiredPermissions: [{ name: PERMISSIONS.LESSON_SETTING, actions: ['read'] }]
}

const viewCampusFeatureConfig: FeatureConfig = {
  requiredPermissions: [{ name: PERMISSIONS.CAMPUS_FEATURE, actions: ['read'] }]
}

const viewSchoolRuleConfig: FeatureConfig = {
  requiredPermissions: [{ name: PERMISSIONS.SCHOOL_RULES, actions: ['read'] }]
}

const viewStudentAchievementConfig: FeatureConfig = {
  requiredPermissions: [{ name: PERMISSIONS.STUDENT_ACHIEVEMENT, actions: ['read'] }]
}

const viewRoleAndPermissionConfig: FeatureConfig = {
  requiredPermissions: [{ name: PERMISSIONS.ROLES_PERMISSIONS, actions: ['read'] }]
}

const viewStudentViolationConfig: FeatureConfig = {
  requiredPermissions: [{ name: PERMISSIONS.STUDENT_VIOLATION, actions: ['read'] }]
}

export {
  viewCampusFeatureConfig,
  viewLessonSettingConfig,
  viewRoleAndPermissionConfig,
  viewSchoolAdmConfig,
  viewSchoolRuleConfig,
  viewStudentAchievementConfig,
  viewStudentManagementConfig,
  viewStudentViolationConfig,
  viewTeacherManagementConfig
}
