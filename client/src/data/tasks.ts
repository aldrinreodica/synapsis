import type { ColumnType } from '../types/tasks'

export const tasksData: ColumnType[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    order: 0,
    tasks: [
      {
        id: 'task-0',
        columnId: 'backlog',
        order: 0,
        title: 'Research Project',
        description: 'Conduct initial research on market trends.',
        label: 'Research',
      },
      {
        id: 'task-1',
        columnId: 'backlog',
        order: 1,
        title: 'Design Wireframe',
        description: 'Create a wireframe for the new feature.',
        label: 'Design',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    order: 1,
    tasks: [
      {
        id: 'task-3',
        columnId: 'in-progress',
        order: 0,
        title: 'Develop API',
        description: 'Build the API for user authentication.',
        label: 'Development',
      },
      {
        id: 'task-4',
        columnId: 'in-progress',
        order: 1,
        title: 'Update UI',
        description: 'Revise the user interface for better UX.',
        label: 'Design',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    order: 2,
    tasks: [
      {
        id: 'task-5',
        columnId: 'done',
        order: 0,
        title: 'Write Documentation',
        description: 'Prepare the project documentation for release.',
        label: 'Documentation',
      },
      {
        id: 'task-6',
        columnId: 'done',
        order: 1,
        title: 'Fix Bugs',
        description: 'Resolve all known bugs from the previous release.',
        label: 'QA',
      },
      {
        id: 'task-7',
        columnId: 'done',
        order: 2,
        title: 'Launch Campaign',
        description: 'Officially launch the marketing campaign.',
        label: 'Marketing',
      },
    ],
  },
]
