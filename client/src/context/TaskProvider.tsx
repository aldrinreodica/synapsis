'use client'

import { createContext, useReducer, useState } from 'react'

import type { ReactNode } from 'react'
import {
  ColumnType,
  ITask,
  TaskContextType,
  TaskStatusEnum,
  TaskWithoutIdAndOrderAndColumnIdType,
} from '@/types/tasks'
import { TaskReducer } from '@/components/reducer/task-reducer'
import { toast } from 'sonner'
import { useTaskMutation } from '@/hooks/use-task'

// Create Task context
export const TaskContext = createContext<TaskContextType | undefined>(undefined)

interface TaskProviderProps {
  taskData: ColumnType[]
  children: ReactNode
}

const TaskProvider = ({ taskData, children }: TaskProviderProps) => {
  // Reducer to manage Task state
  const [taskState, dispatch] = useReducer(TaskReducer, {
    columns: taskData,
    selectedColumn: undefined,
    selectedTask: undefined,
  })

  // Sidebar state management
  const [itemAddTaskSidebarIsOpen, setItemAddTaskSidebarIsOpen] =
    useState(false)
  const [itemUpdateTaskSidebarIsOpen, setItemUpdateTaskSidebarIsOpen] =
    useState(false)

  const taskMutation = useTaskMutation('create')
  const taskUpdateMutation = useTaskMutation('update')
  const taskDeleteMutation = useTaskMutation('delete')
  const taskUpdateStatusMutation = useTaskMutation('updateStatus')

  // Handlers for task actions
  const handleAddTask = async (
    task: TaskWithoutIdAndOrderAndColumnIdType,
    columnId: ColumnType['id'],
    userId?: string
  ) => {
    const newTask = {
      ...task,
      status: columnId as TaskStatusEnum,
      userId: userId || '',
    }
    await taskMutation?.mutateAsync(newTask as any).then((data) => {
      dispatch({
        type: 'addTask',
        task: data.task,
        columnId,
      })

      toast.success('A task has been created', {
        description: `Info: ${data.task.title} - ${data.task.description}`,
      })
    })
  }

  const handleUpdateTask = async (task: ITask) => {
    await taskUpdateMutation?.mutateAsync(task as any).then((data) => {
      dispatch({ type: 'updateTask', task: data.task })
      toast.success('A task has been updated', {
        description: `Info: ${data.task.title} - ${data.task.description}`,
      })
    })
  }

  const handleDeleteTask = async (taskId: ITask['id']) => {
    await taskDeleteMutation?.mutateAsync(taskId as any).then((data) => {
      dispatch({ type: 'deleteTask', taskId })
      toast.success('A task has been deleted', {
        description: `Info: ${data.task.title} - ${data.task.description}`,
      })
    })
  }

  // Reorder handlers
  const handleReorderColumns = (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    if (sourceIndex === destinationIndex) return

    dispatch({
      type: 'reorderColumns',
      sourceIndex,
      destinationIndex,
    })
  }

  const handleReorderTasks = async (
    sourceColumnId: string,
    sourceIndex: number,
    destinationColumnId: string,
    destinationIndex: number,
    draggableId: string
  ) => {
    if (
      sourceColumnId === destinationColumnId &&
      sourceIndex === destinationIndex
    )
      return

    const newData = {
      id: draggableId,
      status: destinationColumnId,
    }
    await taskUpdateStatusMutation?.mutateAsync(newData as any).then((data) => {
      dispatch({
        type: 'reorderTasks',
        source: { columnId: sourceColumnId, index: sourceIndex },
        destination: { columnId: destinationColumnId, index: destinationIndex },
      })
      toast.success('A task status has been updated', {
        description: `Info: ${sourceColumnId} - ${data.task.status}`,
      })
    })
  }

  // Selection handlers
  const handleSelectColumn = (column: ColumnType | undefined) => {
    dispatch({ type: 'selectColumn', column })
  }

  const handleSelectTask = (task: ITask | undefined) => {
    dispatch({ type: 'selectTask', task })
  }

  return (
    <TaskContext.Provider
      value={{
        taskState,
        itemAddTaskSidebarIsOpen,
        setItemAddTaskSidebarIsOpen,
        itemUpdateTaskSidebarIsOpen,
        setItemUpdateTaskSidebarIsOpen,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleReorderColumns,
        handleReorderTasks,
        handleSelectColumn,
        handleSelectTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider
