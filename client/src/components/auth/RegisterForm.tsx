'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '@/schemas/auth.schema'
import { useRegister } from '@/hooks/use-register'
import useAuth from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { Spinner } from '../ui/spinner'

const RegisterForm = () => {
  const { setUser } = useAuth()
  const registerMutation = useRegister()
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const { username, email, password } = values
    console.log(values)

    await registerMutation
      .mutateAsync({ username, email, password })
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
        }
      })
      .catch((error) => {
        console.error('Register error', error)
      })
  }

  return (
    <div className="w-full max-w-sm sm:w-[260px]">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-2xl">Create an account</h1>
            <p className="text-muted-foreground text-sm">
              Sign up to get started with Synapsis
            </p>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background"
                    placeholder="john-doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background"
                    placeholder="Create a strong password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Must contain uppercase, lowercase, and number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending && <Spinner />} Create Account
          </Button>
          <p className="text-center text-muted-foreground text-sm">
            Already have an account?{' '}
            <a className="hover:underline" href="/login">
              Sign in
            </a>
          </p>
        </form>
      </Form>
    </div>
  )
}
export default RegisterForm
