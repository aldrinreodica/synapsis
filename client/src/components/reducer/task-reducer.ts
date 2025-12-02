import { ITask, TaskActionType, TaskStateType } from '@/types/tasks'

export const TaskReducer = (
  state: TaskStateType,
  action: TaskActionType
): TaskStateType => {
  switch (action.type) {
    case 'addTask': {
      return {
        ...state,
        columns: state.columns.map((column) => {
          if (column.id === action.columnId) {
            const newTask = {
              ...action.task,
              id: crypto.randomUUID(),
              columnId: action.columnId,
            }
            return {
              ...column,
              tasks: [...column.tasks, newTask],
            }
          }
          return column
        }),
      }
    }

    case 'updateTask': {
      return {
        ...state,
        columns: state.columns.map((column) => {
          const updatedTasks = column.tasks.map((task) =>
            task.id === action.task.id
              ? { ...action.task, columnId: column.id }
              : task
          )
          return { ...column, tasks: updatedTasks }
        }),
      }
    }

    case 'deleteTask': {
      return {
        ...state,
        columns: state.columns.map((column) => {
          const updatedTasks = column.tasks.filter(
            (task) => task.id !== action.taskId
          )
          return { ...column, tasks: updatedTasks }
        }),
      }
    }

    case 'reorderColumns': {
      const { sourceIndex, destinationIndex } = action
      const reorderedColumns = [...state.columns]
      const [movedColumn] = reorderedColumns.splice(sourceIndex, 1)
      reorderedColumns.splice(destinationIndex, 0, movedColumn)

      return {
        ...state,
        columns: reorderedColumns.map((column, index) => ({
          ...column,
          order: index,
        })),
      }
    }

    case 'reorderTasks': {
      const { source, destination } = action

      // If the task is moved within the same column
      if (source.columnId === destination.columnId) {
        return {
          ...state,
          columns: state.columns.map((column) => {
            if (column.id === source.columnId) {
              const updatedTasks = [...column.tasks]
              const [movedTask] = updatedTasks.splice(source.index, 1)
              updatedTasks.splice(destination.index, 0, movedTask)

              return {
                ...column,
                tasks: updatedTasks.map((task, index) => ({
                  ...task,
                  order: index,
                })),
              }
            }
            return column
          }),
        }
      } else {
        let movedTask: ITask | undefined

        const updatedState = {
          ...state,
          columns: state.columns.map((column) => {
            if (column.id === source.columnId) {
              const updatedSourceTasks = [...column.tasks]
              ;[movedTask] = updatedSourceTasks.splice(source.index, 1)
              return { ...column, tasks: updatedSourceTasks }
            }
            return column
          }),
        }

        // Update destination column to add the task
        return {
          ...updatedState,
          columns: updatedState.columns.map((column) => {
            if (column.id === destination.columnId && movedTask) {
              const updatedDestinationTasks = [...column.tasks]
              const movedTaskWithUpdatedColumnId = {
                ...movedTask,
                columnId: destination.columnId,
                order: updatedDestinationTasks.length,
              }
              updatedDestinationTasks.splice(
                destination.index,
                0,
                movedTaskWithUpdatedColumnId
              )

              return {
                ...column,
                tasks: updatedDestinationTasks.map((task, index) => ({
                  ...task,
                  order: index,
                })),
              }
            }
            return column
          }),
        }
      }
    }

    case 'selectColumn': {
      return { ...state, selectedColumn: action.column }
    }

    case 'selectTask': {
      return { ...state, selectedTask: action.task }
    }

    default:
      return state
  }
}
