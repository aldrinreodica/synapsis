'use client'

import { useContext } from 'react'
import { TaskContext } from '@/context/TaskProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskByStatus,
} from '@/services/tasks'

enum TaskMutationEnum {
  'create' = 'create',
  'update' = 'update',
  'delete' = 'delete',
  'updateStatus' = 'updateStatus',
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}

export const useTaskMutation = (action: string) => {
  const queryClient = useQueryClient()
  switch (action) {
    case TaskMutationEnum.create:
      return useMutation({
        mutationKey: ['task', 'create'],
        mutationFn: createTask,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
      })
    case TaskMutationEnum.update:
      return useMutation({
        mutationKey: ['task', 'update'],
        mutationFn: updateTask,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
      })
    case TaskMutationEnum.delete:
      return useMutation<any, Error, string>({
        mutationKey: ['task', 'delete'],
        mutationFn: deleteTask,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
      })
    case TaskMutationEnum.updateStatus:
      return useMutation({
        mutationKey: ['task', 'updateStatus'],
        mutationFn: updateTaskByStatus,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
      })
    default:
      break
  }
}
