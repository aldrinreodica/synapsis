'use client'

import { Droppable } from '@hello-pangea/dnd'

import type { DroppableProvided } from '@hello-pangea/dnd'

import { CardContent } from '@/components/ui/card'
import { ColumnType } from '@/types/tasks'
import TaskboardTaskItem from './TaskboardTaskItem'
import TaskboardAddNewTaskButton from './TaskboardAddNewTaskButton'

interface TaskboardTaskListProps {
  column: ColumnType
}

const TaskboardTaskList = ({ column }: TaskboardTaskListProps) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided: DroppableProvided) => (
        <CardContent
          ref={provided.innerRef}
          className="grid p-0 min-h-44"
          {...provided.droppableProps}
        >
          {column.tasks.map((task, index) => (
            <TaskboardTaskItem key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
          <TaskboardAddNewTaskButton column={column} />
        </CardContent>
      )}
    </Droppable>
  )
}

export default TaskboardTaskList
