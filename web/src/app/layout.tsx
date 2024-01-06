import type { Metadata } from 'next'
import { Syne, Poppins, Inconsolata } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify';
import { Header } from '@/components/layout/Header'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';


const syne = Syne({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-syne',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-poppins',
})

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inconsolata',
})

export const metadata: Metadata = {
  title: 'Evoe - teste',
  description: 'Página de teste para desenvolvedor pleno na Evoe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inconsolata.className} ${syne.className} ${poppins.className} flex flex-col items-center justify-start min-h-screen max-w-screen bg-white px-4`}>
        <ToastContainer />

        <Header />

        {children}
      </body>
    </html>
  )
}
