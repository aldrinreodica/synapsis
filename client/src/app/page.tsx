'use client'

import useAuth from '@/hooks/useAuth'

export default function Home() {
  const { user, isAuthenticated } = useAuth()

  if (isAuthenticated) {
    console.log('User is authenticated')
  } else {
    console.log('User is not authenticated')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        Hello there, {user?.username}
      </main>
    </div>
  )
}
