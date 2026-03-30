import { Navbar } from '@/components/organisms/layout/Navbar'
import { Footer } from '@/components/organisms/layout/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
