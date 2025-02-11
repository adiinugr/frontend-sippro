'use client'

// MUI Imports
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import type { TypographyProps } from '@mui/material/Typography'
import type { CardProps } from '@mui/material/Card'

import { toast } from 'react-toastify'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { deleteRoleById } from '@/libs/actions/roles'

// Component Imports
import RoleDialog from '@components/dialogs/role-dialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import Link from '@components/Link'
import type { RoleType } from '@/types/roleTypes'
import DeleteDialog from '@/components/other/DeleteDialog'
import AssignRoleDialog from '@/views/roles/AssignRoleDialog'

type CardDataType = {
  id: any
  title: string
  avatars: string[]
  totalUsers: number
}

const RoleCards = ({ tableData }: { tableData?: RoleType[] }) => {
  // Add state for menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [roleAssignDialogOpen, setRoleAssignDialogOpen] = useState<boolean>(false)

  // Transform roles data directly into card format
  const formattedCardData: CardDataType[] =
    tableData?.map(role => ({
      id: role.id,
      title: role.name,
      totalUsers: role.teachersToRoles?.length || 0,
      avatars: role.teachersToRoles?.length ? [role.teachersToRoles[0].teachers.avatar || '1.png'] : ['1.png']
    })) || []

  // Vars
  const typographyProps: TypographyProps = {
    children: 'Edit Role',
    component: Link,
    color: 'primary',
    onClick: e => e.preventDefault()
  }

  const CardProps: CardProps = {
    className: 'cursor-pointer bs-full',
    children: (
      <Grid container className='bs-full'>
        <Grid item xs={5}>
          <div className='flex items-end justify-center bs-full'>
            <img alt='add-role' src='/images/illustrations/characters/5.png' height={130} />
          </div>
        </Grid>
        <Grid item xs={7}>
          <CardContent>
            <div className='flex flex-col items-end gap-4 text-right'>
              <Button variant='contained' size='small'>
                Tambah Role
              </Button>
              <Typography>
                Tambahkan Role baru, <br />
                jika tidak ada.
              </Typography>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    )
  }

  const handleOpenDeleteDialog = (id: number) => {
    setSelectedRoleId(id)
    setOpenDialog(true)
  }

  const handleOpenRoleAssignDialog = (id: number) => {
    setSelectedRoleId(id)
    setRoleAssignDialogOpen(true)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedRoleId(null)
  }

  const handleDeleteRole = async () => {
    setOpenDialog(true)
    handleMenuClose()
  }

  const handleDeleteData = async () => {
    setIsDeleting(true)

    try {
      const res = await deleteRoleById(Number(selectedRoleId))

      setIsDeleting(false)
      setOpenDialog(false)

      if (res.statusCode === 200) {
        toast.success(`Berhasil menghapus data!`)

        return
      }

      toast.error(`Gagal menghapus data!`)
    } catch (error) {
      setIsDeleting(false)
      setOpenDialog(false)

      toast.error(`Gagal menghapus data!`)
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        {formattedCardData.map((item, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card>
              <CardContent className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <Typography className='flex-grow'>{`Total ${item.totalUsers} users`}</Typography>
                  <AvatarGroup total={item.totalUsers}>
                    {item.avatars.map((img, index: number) => (
                      <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
                    ))}
                  </AvatarGroup>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col items-start gap-1'>
                    <Typography variant='h5'>{item.title}</Typography>
                    <OpenDialogOnElementClick
                      element={Typography}
                      elementProps={typographyProps}
                      dialog={RoleDialog}
                      dialogProps={{ title: item.title, id: item.id }}
                    />
                  </div>
                  <div>
                    <IconButton onClick={() => handleOpenDeleteDialog(item.id)}>
                      <i className='tabler-trash text-secondary' />
                    </IconButton>
                    <IconButton onClick={() => handleOpenRoleAssignDialog(item.id)}>
                      <i className='tabler-user-square-rounded' />
                    </IconButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} lg={4}>
          <OpenDialogOnElementClick element={Card} elementProps={CardProps} dialog={RoleDialog} />
        </Grid>
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} onClick={handleMenuClose}>
        <MenuItem onClick={handleDeleteRole} disabled={isDeleting} sx={{ color: 'error.main' }}>
          <i className='tabler-trash mie-2' />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </MenuItem>
      </Menu>

      <DeleteDialog
        open={openDialog}
        isLoading={isDeleting}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={handleDeleteData}
      />

      <AssignRoleDialog open={roleAssignDialogOpen} setOpen={setRoleAssignDialogOpen} roleId={selectedRoleId} />
    </>
  )
}

export default RoleCards
