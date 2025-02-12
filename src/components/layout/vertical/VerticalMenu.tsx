// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import { useSession } from 'next-auth/react'

import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, MenuSection, SubMenu } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()

  const { data: session } = useSession()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {/* Teacher Menu */}
        {session?.user.status === 'teacher' && (
          <MenuSection label='Teacher'>
            <MenuItem icon={<i className='tabler-layout-dashboard' />} href='/dashboard'>
              Dashboard
            </MenuItem>
            <SubMenu label='Setting' icon={<i className='tabler-file-settings' />}>
              <MenuItem href='/teacher/setting/lesson-year'>Tahun Pelajaran</MenuItem>
              <MenuItem href='/teacher/setting/grade'>Jenjang</MenuItem>
              <MenuItem href='/teacher/setting/classroom'>Kelas</MenuItem>
              <MenuItem href='/teacher/setting/subject'>Mata Pelajaran</MenuItem>
              <SubMenu label='Kelompok Mapel'>
                <MenuItem href='/teacher/setting/subject-group/list'>List</MenuItem>
                <MenuItem href='/teacher/setting/subject-group/add'>Tambah</MenuItem>
              </SubMenu>
            </SubMenu>
            <SubMenu label='Info Kampus' icon={<i className='tabler-school' />}>
              <MenuItem href='/teacher/campus/passing-grade'>Passing Grade & Kuota</MenuItem>
              <MenuItem href='/teacher/campus/linear-subject'>Mapel Pendukung</MenuItem>
              <MenuItem href='/teacher/campus/graduate-info'>Info Lulusan</MenuItem>
            </SubMenu>

            {session?.user?.roles?.includes('Super Admin') && (
              <>
                <SubMenu label='Tata Tertib' icon={<i className='tabler-alert-triangle' />}>
                  <MenuItem href='/teacher/violation/category'>Kategori</MenuItem>
                  <MenuItem href='/teacher/violation/rules'>Peraturan</MenuItem>
                  <SubMenu label='Pelanggaran'>
                    <MenuItem href='/teacher/violation/list'>List Data</MenuItem>
                    <MenuItem href='/teacher/violation/add'>Tambah</MenuItem>
                  </SubMenu>
                </SubMenu>
                <SubMenu label='Roles & Permissions' icon={<i className='tabler-lock' />}>
                  <MenuItem href={`/teacher/roles`}>Roles</MenuItem>
                  <MenuItem href={`/teacher/permissions`}>Permissions</MenuItem>
                </SubMenu>{' '}
              </>
            )}
            <SubMenu label='User' icon={<i className='tabler-users' />}>
              <SubMenu label='Siswa'>
                <MenuItem href='/teacher/user/student/list'>List</MenuItem>
                <MenuItem href='/teacher/user/student/add'>Tambah</MenuItem>
              </SubMenu>
              {session?.user?.roles?.includes('Super Admin') && (
                <SubMenu label='Guru'>
                  <MenuItem href='/teacher/user/teacher/list'>List</MenuItem>
                  <MenuItem href='/teacher/user/teacher/add'>Tambah</MenuItem>
                </SubMenu>
              )}
            </SubMenu>
          </MenuSection>
        )}

        {session?.user.status === 'student' && (
          <MenuSection label='Siswa'>
            <MenuItem icon={<i className='tabler-layout-dashboard' />} href='/dashboard'>
              Dashboard
            </MenuItem>
            <SubMenu label='Info Kampus' icon={<i className='tabler-school' />}>
              <MenuItem href='/student/campus/passing-grade'>Passing Grade & Kuota</MenuItem>
              <MenuItem href='/student/campus/linear-subject'>Mapel Pendukung</MenuItem>
              <MenuItem href='/student/campus/graduate-info'>Info Lulusan</MenuItem>
            </SubMenu>
            <MenuItem icon={<i className='tabler-report-analytics' />} href='/student/report'>
              Nilai Raport
            </MenuItem>
            <MenuItem icon={<i className='tabler-trophy' />} href='/student/achievement'>
              Prestasi
            </MenuItem>
            <MenuItem icon={<i className='tabler-message-chatbot' />} href='/student/chat-ai'>
              Tanya AI
            </MenuItem>
            <MenuItem icon={<i className='tabler-user' />} href='/profile'>
              Profile
            </MenuItem>
          </MenuSection>
        )}
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
