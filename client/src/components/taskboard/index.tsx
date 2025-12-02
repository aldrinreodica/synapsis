'use client'

import { useQuery } from '@tanstack/react-query'
import Taskboard from './Taskboard'
import TaskboardWrapper from './TaskboardWrapper'
import { getTasks } from '@/services/tasks'
import { useMemo } from 'react'
import { formatTasksToColumns } from '@/lib/utils'
import Loading from '../Loading'
import { ColumnType } from '@/types/tasks'

const TaskboardRoot = () => {
  const {
    data: tasksData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  const formattedTasks: ColumnType[] = useMemo(() => {
    if (tasksData) return formatTasksToColumns(tasksData ?? [])

    return []
  }, [tasksData])

  if (error) console.error('Task fetch failed: ', error)

  if (isLoading) return <Loading />

  return (
    <TaskboardWrapper tasksData={formattedTasks}>
      <Taskboard />
    </TaskboardWrapper>
  )
}
export default TaskboardRoot
