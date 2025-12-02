import TaskProvider from '@/context/TaskProvider'
import { ColumnType } from '@/types/tasks'
import { ReactNode } from 'react'
import TaskboardSidebar from './taskboard-sidebar'

interface TaskboardWrapperProps {
  tasksData: ColumnType[]
  children: ReactNode
}

const TaskboardWrapper = ({ tasksData, children }: TaskboardWrapperProps) => {
  return (
    <TaskProvider taskData={tasksData}>
      <div className="flex">
        <TaskboardSidebar />
        {children}
      </div>
    </TaskProvider>
  )
}
export default TaskboardWrapper
