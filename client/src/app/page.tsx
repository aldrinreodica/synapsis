'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import TaskboardRoot from '@/components/taskboard'
import { Spinner } from '@/components/ui/spinner'
import useAuth from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated)
    return (
      <div className="flex h-svh justify-center items-center">
        <Spinner className="size-8" />
      </div>
    )

  return (
    <DashboardLayout>
      <TaskboardRoot />
    </DashboardLayout>
  )
}

export default Home
