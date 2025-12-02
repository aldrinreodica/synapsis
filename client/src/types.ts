import { icons } from 'lucide-react'

export interface NavigationType {
  title: string
  items: NavigationRootItem[]
  roles?: string[]
}

export type DynamicIconNameType = keyof typeof icons

export interface NavigationRootItemBasicType {
  title: string
  label?: string
  iconName: DynamicIconNameType
  roles?: string[]
}

export type NavigationRootItem =
  | NavigationRootItemWithHrefType
  | NavigationRootItemWithItemsType

export interface NavigationRootItemWithItemsType extends NavigationRootItemBasicType {
  items: (
    | NavigationNestedItemWithHrefType
    | NavigationNestedItemWithItemsType
  )[]
  href?: never
  roles?: string[]
}

export interface NavigationRootItemWithHrefType extends NavigationRootItemBasicType {
  href: string
  items?: never
  roles?: string[]
}

export interface NavigationNestedItemBasicType {
  title: string
  label?: string
  roles?: string[]
}

export interface NavigationNestedItemWithHrefType extends NavigationNestedItemBasicType {
  href: string
  items?: never
  roles?: string[]
}

export interface NavigationNestedItemWithItemsType extends NavigationNestedItemBasicType {
  items: (
    | NavigationNestedItemWithHrefType
    | NavigationNestedItemWithItemsType
  )[]
  href?: never
  roles?: string[]
}

export type NavigationNestedItem =
  | NavigationNestedItemWithHrefType
  | NavigationNestedItemWithItemsType
