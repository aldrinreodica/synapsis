'use client'

import { Droppable } from '@hello-pangea/dnd'

import type { DroppableProvided } from '@hello-pangea/dnd'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useTaskContext } from '@/hooks/use-task'
import TaskboardColumnItem from './TaskboardColumnItem'

const TaskColumnList = () => {
  const { taskState } = useTaskContext()
  return (
    <ScrollArea className="container flex-1 w-0 p-0">
      <Droppable droppableId="root" type="Column" direction="horizontal">
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-x-4 p-4"
          >
            {taskState.columns.map((column, index) => (
              <TaskboardColumnItem
                key={column.id}
                column={column}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default TaskColumnList
