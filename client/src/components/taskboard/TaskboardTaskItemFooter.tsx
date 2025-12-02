'use client'

import { CardFooter } from '@/components/ui/card'
import { ITask } from '@/types/tasks'
import { formatDate } from '@/lib/utils'

interface TaskboardTaskItemFooterProps {
  task: ITask
}

const TaskboardTaskItemFooter = ({ task }: TaskboardTaskItemFooterProps) => {
  return (
    <CardFooter className="justify-between gap-2 pe-3 ps-5">
      <div className="flex items-center justify-between w-full">
        <p className="text-xs px-1 font-bold">{task?.user?.username || ''}</p>
        {task?.createdAt && (
          <p className="text-xs px-3 text-gray-400">
            {formatDate(task.createdAt, {
              month: 'short',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    </CardFooter>
  )
}

export default TaskboardTaskItemFooter
