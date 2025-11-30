'use client'

import { Spinner } from '@/components/ui/spinner'
import useAuth from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { user, isAuthenticated } = useAuth()
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        Hello there, {user?.username}
      </main>
    </div>
  )
}
