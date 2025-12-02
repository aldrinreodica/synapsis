'use client'

import { CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { ITask } from '@/types/tasks'

interface TaskboardTaskItemContentProps {
  task: ITask
}

const TaskboardTaskItemContent = ({ task }: TaskboardTaskItemContentProps) => {
  return (
    <CardContent>
      <CardTitle>{task.title}</CardTitle>
      <CardDescription>{task.description}</CardDescription>
    </CardContent>
  )
}

export default TaskboardTaskItemContent
