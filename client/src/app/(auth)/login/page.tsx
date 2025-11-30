'use client'

import LoginForm from '@/components/auth/LoginForm'
import useAuth from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Login = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated, router])

  return (
    <div className="flex w-fit min-h-svh justify-center items-center mx-auto">
      <LoginForm />
    </div>
  )
}
export default Login
