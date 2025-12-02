'use client'

import { useState } from 'react'
import { EllipsisVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTaskContext } from '@/hooks/use-task'
import { ITask } from '@/types/tasks'

interface TaskboardTaskItemActionsProps {
  task: ITask
}

const TaskboardTaskItemActions = ({ task }: TaskboardTaskItemActionsProps) => {
  const [open, onOpenChange] = useState(false)
  const { setItemUpdateTaskSidebarIsOpen, handleSelectTask, handleDeleteTask } =
    useTaskContext()

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 ms-auto data-[state=open]:bg-muted"
          aria-label="More actions"
        >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => {
            handleSelectTask(task)
            onOpenChange(false)
            setItemUpdateTaskSidebarIsOpen(true)
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => handleDeleteTask(task.id)}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TaskboardTaskItemActions
