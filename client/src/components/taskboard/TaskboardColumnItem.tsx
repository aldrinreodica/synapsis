'use client'

import { ColumnType } from '@/types/tasks'
import { Draggable } from '@hello-pangea/dnd'

import type { DraggableProvided } from '@hello-pangea/dnd'
import TaskboardColumnItemHeader from './TaskboardColumnItemHeader'
import TaskboardItemList from './TaskboardItemList'

interface TaskColumnProps {
  column: ColumnType
  index: number
}

const TaskColumnItem = ({ column, index }: TaskColumnProps) => {
  return (
    <Draggable
      draggableId={column.id} // A unique identifier for this column, which helps the library track and move the item
      index={index} // The position of this column in the root, used for reordering columns when drag-and-drop occurs
    >
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          className="w-64 h-fit md:w-72"
          {...provided.draggableProps} // Draggable props for drag-and-drop functionality
        >
          <TaskboardColumnItemHeader column={column} provided={provided} />
          <TaskboardItemList column={column} />
        </div>
      )}
    </Draggable>
  )
}

export default TaskColumnItem
