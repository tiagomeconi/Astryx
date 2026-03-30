import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ClientNavbar } from '@/components/organisms/layout/ClientNavbar'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen flex flex-col">
      <ClientNavbar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-4xl">
        {children}
      </main>
    </div>
  )
}
