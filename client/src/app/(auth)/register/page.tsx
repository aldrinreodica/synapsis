'use client'

import RegisterForm from '@/components/auth/RegisterForm'
import useAuth from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Register = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated, router])

  return (
    <div className="flex w-fit min-h-svh justify-center items-center mx-auto">
      <RegisterForm />
    </div>
  )
}

export default Register
