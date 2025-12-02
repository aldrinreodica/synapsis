import type { NavigationType } from '@/types'

export const navigationsData: NavigationType[] = [
  {
    title: 'Home',
    items: [
      {
        title: 'Task Board',
        href: '/',
        iconName: 'Grid2x2',
        roles: ['user', 'admin', 'superadmin'],
      },
      {
        title: 'Dashboard',
        href: '/',
        iconName: 'LayoutDashboard',
        roles: ['admin', 'superadmin'],
      },
    ],
    roles: ['user', 'admin', 'superadmin'],
  },
  {
    title: 'Manage',
    items: [
      {
        title: 'Manage Users',
        iconName: 'Users',
        items: [
          {
            title: 'User',
            href: '/user',
            roles: ['admin', 'superadmin'],
          },
          {
            title: 'Admin',
            href: '/admin',
            roles: ['superadmin'],
          },
        ],
        roles: ['admin', 'superadmin'],
      },
    ],
    roles: ['admin', 'superadmin'],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Account',
        href: '/',
        iconName: 'UserCog',
        roles: ['user', 'admin', 'superadmin'],
        label: 'Soon',
      },
    ],
    roles: ['user', 'admin', 'superadmin'],
  },
]
