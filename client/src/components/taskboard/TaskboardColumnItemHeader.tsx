'use client'

import { GripVertical } from 'lucide-react'

import type { DraggableProvided } from '@hello-pangea/dnd'

import { ColumnType } from '@/types/tasks'

import { cn } from '@/lib/utils'

import { buttonVariants } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import TaskColumnActions from './TaskboardColumnActions'

interface TaskboardColumnItemHeaderProps {
  column: ColumnType
  provided: DraggableProvided
}

const TaskboardColumnItemHeader = ({
  column,
  provided,
}: TaskboardColumnItemHeaderProps) => {
  return (
    <CardHeader className="flex-row items-center space-y-0 gap-x-1.5 p-0">
      <div
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'text-secondary-foreground/50 cursor-grab'
        )}
        {...provided.dragHandleProps} // Draggable props for drag-and-drop functionality
        aria-label="Move task"
      >
        <GripVertical className="size-4" />
      </div>
      <CardTitle className="me-auto">{column.title}</CardTitle>
      <TaskColumnActions column={column} />
    </CardHeader>
  )
}

export default TaskboardColumnItemHeader
