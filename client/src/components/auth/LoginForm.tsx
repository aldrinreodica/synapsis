'use client'

import useAuth from '@/hooks/use-auth'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInSchema } from '@/schemas/auth.schema'
import { useLogin } from '@/hooks/use-login'
import { Spinner } from '../ui/spinner'

const LoginForm = () => {
  const { setUser } = useAuth()
  const loginMutation = useLogin()
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const { email, password } = values

    await loginMutation
      .mutateAsync({ email, password })
      .then((data) => {
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('token', data.token)
          setUser(data.user)
          router.push('/')
        } else {
          if (data.error === 'email')
            form.setError('email', {
              type: 'manual',
              message: data.message,
            })

          if (data.error === 'password')
            form.setError('password', {
              type: 'manual',
              message: data.message,
            })
        }
      })
      .catch((error) => {
        console.error('Login error', error)
      })
  }

  return (
    <div className="w-full max-w-sm sm:w-[260px]">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-2xl">Welcome back!</h1>
            <p className="text-muted-foreground text-sm">
              Login to your Synapsis account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background"
                    placeholder="john@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }: any) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                </div>
                <FormControl>
                  <Input
                    className="bg-background"
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending && <Spinner />} Sign In
          </Button>
          <p className="text-center text-muted-foreground text-sm">
            Don't have an account?{' '}
            <Link className="hover:underline" href="/register">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}
export default LoginForm
