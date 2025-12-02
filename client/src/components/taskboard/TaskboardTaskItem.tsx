'use client'

import { Draggable } from '@hello-pangea/dnd'

import type { DraggableProvided } from '@hello-pangea/dnd'

import { Card } from '@/components/ui/card'
import { ITask } from '@/types/tasks'
import TaskboardTaskItemHeader from './TaskboardTaskItemHeader'
import TaskboardTaskItemContent from './TaskboardTaskItemContent'
import TaskboardTaskItemFooter from './TaskboardTaskItemFooter'

interface TaskTaskItemProps {
  task: ITask
  index: number
}

const TaskboardTaskItem = ({ task, index }: TaskTaskItemProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided) => (
        <Card
          ref={provided.innerRef}
          className="my-2 w-64 md:w-72"
          {...provided.draggableProps}
        >
          <TaskboardTaskItemHeader task={task} provided={provided} />
          <TaskboardTaskItemContent task={task} />
          <TaskboardTaskItemFooter task={task} />
        </Card>
      )}
    </Draggable>
  )
}

export default TaskboardTaskItem
