import { ColumnType, ITask } from '@/types/tasks'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isActivePathname(
  basePathname: string,
  currentPathname: string,
  exactMatch: boolean = false
) {
  if (typeof basePathname !== 'string' || typeof currentPathname !== 'string') {
    throw new Error('Both basePathname and currentPathname must be strings')
  }

  if (exactMatch) {
    return basePathname === currentPathname
  }

  return (
    currentPathname.startsWith(basePathname) &&
    (currentPathname.length === basePathname.length ||
      currentPathname[basePathname.length] === '/')
  )
}

export function formatTasksToColumns(tasks: ITask[]): ColumnType[] {
  const columnOrder = ['todo', 'doing', 'done', 'cancelled']

  const columnTitles: Record<string, string> = {
    todo: 'To Do',
    doing: 'Doing',
    done: 'Done',
    cancelled: 'Cancelled',
  }

  const grouped: Record<string, ColumnType> = {}

  for (const col of columnOrder) {
    grouped[col] = {
      id: col,
      title: columnTitles[col],
      order: columnOrder.indexOf(col),
      tasks: [],
    }
  }

  tasks.forEach((task) => {
    grouped[task.columnId].tasks.push(task)
  })

  return Object.values(grouped)
}

export const formatDate = (
  dateValue: string | number | Date,
  options: Intl.DateTimeFormatOptions
): string => {
  const date = new Date(dateValue)
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
  return formattedDate
}
