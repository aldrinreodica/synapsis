'use client'

import { useTaskContext } from '@/hooks/use-task'
import { DragDropContext } from '@hello-pangea/dnd'

import type { DropResult } from '@hello-pangea/dnd'
import TaskColumnList from './TaskboardColumnList'

const Taskboard = () => {
  const { handleReorderColumns, handleReorderTasks } = useTaskContext()
  const handleDragDrop = (result: DropResult) => {
    const { source, destination, type, draggableId } = result
    // Ignore if there's no destination
    if (!destination) return
    if (type === 'Column') {
      handleReorderColumns(source.index, destination.index)
    } else {
      handleReorderTasks(
        source.droppableId,
        source.index,
        destination.droppableId,
        destination.index,
        draggableId
      )
    }
  }
  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <TaskColumnList />
    </DragDropContext>
  )
}

export default Taskboard
