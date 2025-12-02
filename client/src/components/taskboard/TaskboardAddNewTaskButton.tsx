'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ColumnType } from '@/types/tasks'
import { useTaskContext } from '@/hooks/use-task'

interface TaskboardTaskListProps {
  column: ColumnType
}

const TaskboardAddNewTaskButton = ({ column }: TaskboardTaskListProps) => {
  const { handleSelectColumn, setItemAddTaskSidebarIsOpen } = useTaskContext()

  return (
    <Button
      variant="outline"
      className="w-full my-2"
      onClick={() => {
        handleSelectColumn(column)
        setItemAddTaskSidebarIsOpen(true)
      }}
    >
      <Plus className="me-2 size-4 text-muted-foreground" />
      Add New Task
    </Button>
  )
}

export default TaskboardAddNewTaskButton
