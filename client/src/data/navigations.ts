import type { NavigationType } from '@/types'

export const navigationsData: NavigationType[] = [
  {
    title: 'Home',
    items: [
      {
        title: 'Task Board',
        href: '/',
        iconName: 'Grid2x2',
      },
      {
        title: 'Dashboard',
        href: '/',
        iconName: 'LayoutDashboard',
      },
    ],
  },
  {
    title: 'Manage',
    items: [
      {
        title: 'Manage users',
        iconName: 'Users',
        items: [
          {
            title: 'User',
            href: '/',
          },
          {
            title: 'Admin',
            href: '/',
          },
        ],
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Account',
        href: '/',
        iconName: 'UserCog',
      },
    ],
  },
]
