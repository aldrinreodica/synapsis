import type { z } from 'zod'
import { ItemTaskSchema, TaskColumnSchema } from '@/schemas/task.schema'
import type { ComponentType, SVGAttributes } from 'react'
import { LucideIcon } from 'lucide-react'

export interface IconProps extends SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export type IconType = ComponentType<IconProps> | LucideIcon

export interface IUser {
  _id: string
  id: string
  username: string
  email: string
  password?: string
  role: 'user' | 'admin' | 'superadmin'
  createdAt?: Date
  updatedAt?: Date
}

export interface ITask {
  id: string
  user: IUser | null
  userId: string
  columnId: string
  title: string
  description?: string
  status: TaskStatusEnum
  label: TaskLabelEnum
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreateTask {
  userId: string
  title: string
  description?: string
  status: TaskStatusEnum
  label: TaskLabelEnum
}

export interface IUpdateTask {
  userId: string
  title: string
  description?: string
  status: TaskStatusEnum
  label: TaskLabelEnum
}

export interface IUpdateTask {
  id: string
}

export enum TaskLabelEnum {
  'personal' = 'personal',
  'health' = 'health',
  'finance' = 'finance',
  'home' = 'home',
  'work' = 'work',
  'meeting' = 'meeting',
  'planning' = 'planning',
  'review' = 'review',
  'urgent' = 'urgent',
  'important' = 'important',
  'later' = 'later',
}

export enum TaskStatusEnum {
  'todo' = 'todo',
  'doing' = 'doing',
  'done' = 'done',
  'cancelled' = 'cancelled',
}

export interface UserType {
  id: string
  username: string
  name: string
  avatar?: string
}

export interface ColumnType {
  id: string
  order: number
  title: string
  tasks: ITask[]
  userId?: string
}

export type ColumnWithoutIdAndOrderAndTasksType = Omit<
  ColumnType,
  'id' | 'order' | 'tasks'
>

export type TaskWithoutIdAndOrderAndColumnIdType = Omit<
  ITask,
  'id' | 'order' | 'columnId'
>

export interface TaskStateType {
  columns: ColumnType[]
  selectedColumn?: ColumnType
  selectedTask?: ITask
}

export interface LabelType {
  id: string
  name: string
}

export type TaskActionType =
  | {
      type: 'addTask'
      task: TaskWithoutIdAndOrderAndColumnIdType
      columnId: string
    }
  | { type: 'updateTask'; task: ITask }
  | { type: 'deleteTask'; taskId: string }
  | { type: 'reorderColumns'; sourceIndex: number; destinationIndex: number }
  | {
      type: 'reorderTasks'
      source: { columnId: string; index: number }
      destination: { columnId: string; index: number }
    }
  | { type: 'selectColumn'; column?: ColumnType }
  | { type: 'selectTask'; task?: ITask }

export interface TaskContextType {
  taskState: TaskStateType
  itemAddTaskSidebarIsOpen: boolean
  setItemAddTaskSidebarIsOpen: (value: boolean) => void
  itemUpdateTaskSidebarIsOpen: boolean
  setItemUpdateTaskSidebarIsOpen: (value: boolean) => void
  handleAddTask: (
    task: TaskWithoutIdAndOrderAndColumnIdType,
    columnId: ColumnType['id'],
    userId?: string
  ) => void
  handleUpdateTask: (task: ITask) => void
  handleDeleteTask: (taskId: ITask['id']) => void
  handleReorderColumns: (sourceIndex: number, destinationIndex: number) => void
  handleReorderTasks: (
    sourceColumnId: string,
    sourceIndex: number,
    destinationColumnId: string,
    destinationIndex: number
  ) => void
  handleSelectColumn: (column: ColumnType | undefined) => void
  handleSelectTask: (task: ITask | undefined) => void
}

export type TaskColumnFormType = z.infer<typeof TaskColumnSchema>

export type ItemTaskFormType = z.infer<typeof ItemTaskSchema>
