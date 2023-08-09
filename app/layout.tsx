import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import './globals.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import { GlobalContextProvider } from './Context/global-context'


const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chai-sutta-Store',
  description: 'Chai-sutta-Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={font.className}>
        <GlobalContextProvider>
          <ModalProvider />
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  )
}
