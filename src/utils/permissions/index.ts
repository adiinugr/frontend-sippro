import React, { useEffect, useState } from 'react'

import type { PermissionName } from '@/utils/permissions/constants'

// Types for the user and permission structure
type Permission = {
  id: number
  name: string
  createdAt: string
}

type RoleToPermission = {
  id: number
  roleId: number
  permissionId: number
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
  permissions: Permission
}

type Role = {
  id: number
  name: string
  rolesToPermissions: RoleToPermission[]
}

type TeacherToRole = {
  teacherId: number
  roleId: number
  roles: Role
}

type User = {
  status: 'teacher' | 'student' | 'parent'
  teachersToRoles: TeacherToRole[]
}

type Action = 'create' | 'read' | 'update' | 'delete'

type PermissionCheck = {
  name: PermissionName
  actions: Action[]
}

// Feature access configuration type
type FeatureConfig = {
  requiredPermissions: PermissionCheck[]
  matchType?: 'every' | 'some'
}

// Main permission checking function that handles multiple permissions
export const checkTeacherPermissions = (
  user: User | null | undefined,
  permissionChecks: PermissionCheck[],
  matchType: 'every' | 'some' = 'every'
): boolean => {
  // Handle loading or error states
  if (!user) return false

  // First check if user is a teacher
  if (user.status !== 'teacher') return false

  // If no roles are assigned, deny access
  if (!user.teachersToRoles || user.teachersToRoles.length === 0) return false

  // Function to check a single permission
  const checkSinglePermission = (permissionCheck: PermissionCheck): boolean => {
    return user.teachersToRoles.some(teacherRole => {
      const rolePermissions = teacherRole.roles.rolesToPermissions

      // Find matching permission
      const matchingPermission = rolePermissions.find(
        rolePermission => rolePermission.permissions.name === permissionCheck.name
      )

      if (!matchingPermission) return false

      // Check if all required actions are allowed
      return permissionCheck.actions.every(action => matchingPermission[action] === true)
    })
  }

  // Check all permissions based on matchType
  return matchType === 'every'
    ? permissionChecks.every(check => checkSinglePermission(check))
    : permissionChecks.some(check => checkSinglePermission(check))
}

// Feature access checking function
const canAccessFeature = (user: User | null | undefined | any, featureConfig: FeatureConfig): boolean => {
  return checkTeacherPermissions(user, featureConfig.requiredPermissions, featureConfig.matchType)
}

interface PermissionGuardProps {
  user: User | null | undefined
  permissions: PermissionCheck[]
  matchType?: 'every' | 'some'
  children: React.ReactNode
  fallback?: React.ReactNode
  loadingFallback?: React.ReactNode
}

export const PermissionGuard = (props: PermissionGuardProps) => {
  const { user, permissions, matchType = 'every', children, fallback = null, loadingFallback = null } = props

  // Handle loading state
  if (user === undefined) {
    return loadingFallback as React.ReactElement | null
  }

  const hasPermission = checkTeacherPermissions(user, permissions, matchType)

  if (!hasPermission) {
    return fallback as React.ReactElement | null
  }

  return React.createElement(React.Fragment, null, children)
}

// Custom hook for checking multiple permissions with loading state
export const useTeacherPermissions = (
  user: User | null | undefined,
  permissions: PermissionCheck[],
  matchType: 'every' | 'some' = 'every'
): { hasPermission: boolean; isLoading: boolean } => {
  const [state, setState] = useState({
    hasPermission: false,
    isLoading: true
  })

  useEffect(() => {
    // Check if still loading
    if (user === undefined) {
      setState({ hasPermission: false, isLoading: true })

      return
    }

    // Update permission state
    setState({
      hasPermission: checkTeacherPermissions(user, permissions, matchType),
      isLoading: false
    })
  }, [user, permissions, matchType])

  return state
}

export { canAccessFeature }
export type { FeatureConfig }
