'use client'

import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AddUserValues, createUserSchema } from '@/schemas/user.schema'
import { FunctionComponent } from 'react'
import { useUserMutation } from '@/hooks/use-user'
import useAuth from '@/hooks/use-auth'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { toast } from 'sonner'

interface AddUserModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const AddUserModal: FunctionComponent<AddUserModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const { user } = useAuth()
  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role: 'user',
    },
  })
  const userMutation = useUserMutation('create')

  const onSubmit = async (values: AddUserValues) => {
    const newUserParams = {
      ...values,
      role: values.role || 'user',
      addedBy: user?._id,
    }
    await userMutation?.mutateAsync(newUserParams as any).then((data) => {
      toast.success('A user has been created', {
        description: `Username: ${data.user.username}`,
      })
      onOpenChange(false)
      form.reset()
    })
  }

  React.useEffect(() => {
    if (isOpen) {
      form.reset()
    }
  }, [isOpen, form.reset])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a user</DialogTitle>
          <DialogDescription>
            Enter the username, email, and password below to register.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              className="col-span-3"
              {...form.register('username')}
            />
            {form.formState.errors.username && (
              <p className="text-sm text-red-500 col-span-4 text-right">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 col-span-4 text-right">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500 col-span-4 text-right">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Controller
              name="role"
              control={form.control}
              rules={{ required: 'Please select a user role.' }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  name={field.name}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="-- Select a role --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.role && (
              <p className="text-sm text-red-500 col-span-4 text-right">
                {form.formState.errors.role.message}
              </p>
            )}
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserModal
