// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Chakra_Petch } from 'next/font/google'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'SIPPRO - Sistem Informasi Pemilihan Prodi',
  description:
    'Membantu siswa untuk menentukan prodi atau jurusan yang cocok dengan nilai raport dan prestasi yang diraih.'
}

const cakra = Chakra_Petch({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cakra',
  weight: ['300', '400', '500']
})

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction} className={`${cakra.variable}`}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
    </html>
  )
}

export default RootLayout
