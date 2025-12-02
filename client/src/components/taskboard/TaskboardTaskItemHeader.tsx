'use client'

import { GripVertical } from 'lucide-react'

import type { DraggableProvided } from '@hello-pangea/dnd'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CardHeader } from '@/components/ui/card'
import TaskboardTaskItemActions from './TaskboardTaskItemActions'
import { ITask } from '@/types/tasks'

interface TaskboardTaskItemHeaderProps {
  task: ITask
  provided: DraggableProvided
}

const TaskboardTaskItemHeader = ({
  task,
  provided,
}: TaskboardTaskItemHeaderProps) => {
  return (
    <CardHeader className="flex-row items-center space-y-0 gap-x-1.5 px-3 py-3.5">
      <div
        className={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'icon',
          }),
          'text-secondary-foreground/50 cursor-grab'
        )}
        {...provided.dragHandleProps} // Draggable props for drag-and-drop functionality
        aria-label="Move task"
      >
        <GripVertical className="size-4" />
      </div>
      <Badge className="capitalize">{task.label}</Badge>
      <TaskboardTaskItemActions task={task} />
    </CardHeader>
  )
}

export default TaskboardTaskItemHeader
