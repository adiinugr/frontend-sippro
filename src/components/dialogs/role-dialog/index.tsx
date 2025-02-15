'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// Component Imports
import { toast } from 'react-toastify'

import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Add at the top with other imports

import { createRolesToPermissions, deleteRolePermissions } from '@/libs/actions/rolesToPermissions'
import { fetchPermissions } from '@/libs/actions/permissions'
import { getRoleById, updateRole, createRole } from '@/libs/actions/roles'

type RoleDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
  id?: string
}

type Permission = {
  id: number
  name: string
  permissionId: number
  read: boolean
  write: boolean
  update: boolean
  delete: boolean
}

const RoleDialog = ({ open, setOpen, title, id }: RoleDialogProps) => {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [roleName, setRoleName] = useState(title || '')

  // Fetch permissions on mount
  useEffect(() => {
    const getPermissions = async () => {
      const response = await fetchPermissions()

      setPermissions(response.result as any)
    }

    getPermissions()
  }, [])

  // Fetch role permissions when id changes
  useEffect(() => {
    const fetchRolePermissions = async () => {
      if (!id) return

      try {
        const response = await getRoleById(Number(id))
        const rolePermissions = response?.result?.rolesToPermissions || []

        const selectedPerms = rolePermissions
          .map((perm: any) => {
            const permId = perm.permissionId

            return ['read', 'create', 'update', 'delete']
              .filter(action => perm[action])
              .map(action => `${permId}-${action}`)
          })
          .flat()

        setSelectedCheckbox(selectedPerms)
      } catch (error) {
        toast.error('Failed to fetch role permissions')
      }
    }

    fetchRolePermissions()
  }, [id])

  const handleClose = () => {
    setOpen(false)
  }

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox

    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      permissions.forEach(permission => {
        const id = permission.id.toString()

        togglePermission(`${id}-read`)
        togglePermission(`${id}-create`)
        togglePermission(`${id}-update`)
        togglePermission(`${id}-delete`)
      })
    }
  }

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < permissions.length * 4) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox, permissions.length])

  const handleSubmit = async () => {
    if (!roleName.trim()) {
      toast.error('Role name is required')

      return
    }

    setIsSubmitting(true)

    try {
      // Update or create role first
      const roleId = id
        ? (await updateRole(Number(id), { name: roleName })).result.id
        : await (
            await createRole({ name: roleName })
          ).result.id

      // Handle permissions
      await deleteRolePermissions(Number(roleId))

      const permissionMap = selectedCheckbox.reduce((acc: Record<string, any>, permission) => {
        const [permissionId, action] = permission.split('-')

        if (!acc[permissionId]) {
          acc[permissionId] = {
            roleId: Number(roleId),
            permissionId: Number(permissionId),
            read: false,
            create: false,
            update: false,
            delete: false
          }
        }

        acc[permissionId][action] = true

        return acc
      }, {})

      await Promise.all(Object.values(permissionMap).map(permission => createRolesToPermissions(permission)))

      toast.success(`Role ${id ? 'updated' : 'created'} successfully`)
      handleClose()
    } catch (error) {
      toast.error(`Failed to ${id ? 'update' : 'create'} role`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {title ? 'Edit Role' : 'Add Role'}
        <Typography component='span' className='flex flex-col text-center'>
          Set Role Permissions
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible flex flex-col gap-6 pbs-0 sm:pli-16'>
          <CustomTextField
            label='Role Name'
            variant='outlined'
            fullWidth
            placeholder='Enter Role Name'
            value={roleName}
            onChange={e => setRoleName(e.target.value)}
            required
          />
          <Typography variant='h5' className='min-is-[225px]'>
            Role Permissions
          </Typography>
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <tbody>
                <tr className='border-bs-0'>
                  <th className='pis-0'>
                    <Typography color='text.primary' className='font-medium whitespace-nowrap flex-grow min-is-[225px]'>
                      Administrator Access
                    </Typography>
                  </th>
                  <th className='!text-end pie-0'>
                    <FormControlLabel
                      className='mie-0 capitalize'
                      control={
                        <Checkbox
                          onChange={handleSelectAllCheckbox}
                          indeterminate={isIndeterminateCheckbox}
                          checked={selectedCheckbox.length === permissions.length * 4}
                        />
                      }
                      label='Select All'
                    />
                  </th>
                </tr>
                {permissions.map(permission => {
                  const id = permission.id.toString()

                  return (
                    <tr key={permission.id} className='border-be'>
                      <td className='pis-0'>
                        <Typography
                          className='font-medium whitespace-nowrap flex-grow min-is-[225px]'
                          color='text.primary'
                        >
                          {permission.name}
                        </Typography>
                      </td>
                      <td className='!text-end pie-0'>
                        <FormGroup className='flex-row justify-end flex-nowrap gap-6'>
                          <FormControlLabel
                            className='mie-0'
                            control={
                              <Checkbox
                                id={`${id}-read`}
                                onChange={() => togglePermission(`${id}-read`)}
                                checked={selectedCheckbox.includes(`${id}-read`)}
                              />
                            }
                            label='Read'
                          />
                          <FormControlLabel
                            className='mie-0'
                            control={
                              <Checkbox
                                id={`${id}-create`}
                                onChange={() => togglePermission(`${id}-create`)}
                                checked={selectedCheckbox.includes(`${id}-create`)}
                              />
                            }
                            label='Create'
                          />
                          <FormControlLabel
                            className='mie-0'
                            control={
                              <Checkbox
                                id={`${id}-update`}
                                onChange={() => togglePermission(`${id}-update`)}
                                checked={selectedCheckbox.includes(`${id}-update`)}
                              />
                            }
                            label='Update'
                          />
                          <FormControlLabel
                            className='mie-0'
                            control={
                              <Checkbox
                                id={`${id}-delete`}
                                onChange={() => togglePermission(`${id}-delete`)}
                                checked={selectedCheckbox.includes(`${id}-delete`)}
                              />
                            }
                            label='Delete'
                          />
                        </FormGroup>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Submit'}
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default RoleDialog
