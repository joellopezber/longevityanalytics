/**
 * DEFAULT LAYOUT
 * Layout principal para las páginas de la aplicación
 */

'use client'

import Header from '@/components/ui/Header'
import Footer from '@/components/ui/footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <>
      <Header />
      
      <main className="grow">

        {children}

      </main>

      <Footer />
    </>
  )
}
