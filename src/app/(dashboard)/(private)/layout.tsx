import { Suspense } from 'react'

// MUI Imports
import Button from '@mui/material/Button'

// Type Imports
import { ToastContainer } from 'react-toastify'

import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Header from '@components/layout/horizontal/Header'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import ScrollToTop from '@core/components/scroll-to-top'
import AuthGuard from '@/hocs/AuthGuard'

// Util Imports
import { getMode, getSystemMode } from '@core/utils/serverHelpers'

import 'react-toastify/dist/ReactToastify.css'
import Loading from '@/app/(dashboard)/(private)/loading'

const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'
  const mode = getMode()
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <AuthGuard>
        <ToastContainer />
        <LayoutWrapper
          systemMode={systemMode}
          verticalLayout={
            <Suspense fallback={<Loading />}>
              <VerticalLayout
                navigation={<Navigation mode={mode} systemMode={systemMode} />}
                navbar={<Navbar />}
                footer={<VerticalFooter />}
              >
                {children}
              </VerticalLayout>
            </Suspense>
          }
          horizontalLayout={
            <HorizontalLayout header={<Header />} footer={<HorizontalFooter />}>
              {children}
            </HorizontalLayout>
          }
        />
        <ScrollToTop className='mui-fixed'>
          <Button
            variant='contained'
            className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
          >
            <i className='tabler-arrow-up' />
          </Button>
        </ScrollToTop>
      </AuthGuard>
    </Providers>
  )
}

export default Layout
