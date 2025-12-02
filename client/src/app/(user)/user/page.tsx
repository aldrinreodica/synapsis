'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import Loading from '@/components/Loading'
import { columns } from '@/components/table/columns'
import { DataTable } from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import AddUserModal from '@/components/user/AddUserModal'
import useAuth from '@/hooks/use-auth'
import { getUsers } from '@/services/users'
import { useQuery } from '@tanstack/react-query'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(user?.role, 'user'),
  })

  const users = useMemo(() => {
    if (usersData) return usersData.users

    return []
  }, [usersData])

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open)
  }

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  if (error) console.error('Task fetch failed: ', error)

  if (isLoading) return <Loading />

  return (
    <DashboardLayout>
      <div className="container mx-auto px-5 py-10">
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Filter by email"
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            disabled
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                  Add user
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DataTable columns={columns} data={users} />
      </div>
      <AddUserModal isOpen={isModalOpen} onOpenChange={handleOpenChange} />
    </DashboardLayout>
  )
}
export default User
