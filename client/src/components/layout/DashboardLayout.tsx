import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'
import useAuth from '@/hooks/use-auth'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-black/50">Welcome!</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/login">
              <Button className="cursor-pointer" onClick={logout}>
                Logout
              </Button>
            </Link>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
export default DashboardLayout
