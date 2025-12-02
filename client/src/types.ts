import { icons } from 'lucide-react'

export interface NavigationType {
  title: string
  items: NavigationRootItem[]
}

export type DynamicIconNameType = keyof typeof icons

export interface NavigationRootItemBasicType {
  title: string
  label?: string
  iconName: DynamicIconNameType
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
}

export interface NavigationRootItemWithHrefType extends NavigationRootItemBasicType {
  href: string
  items?: never
}

export interface NavigationNestedItemBasicType {
  title: string
  label?: string
}

export interface NavigationNestedItemWithHrefType extends NavigationNestedItemBasicType {
  href: string
  items?: never
}

export interface NavigationNestedItemWithItemsType extends NavigationNestedItemBasicType {
  items: (
    | NavigationNestedItemWithHrefType
    | NavigationNestedItemWithItemsType
  )[]
  href?: never
}

export type NavigationNestedItem =
  | NavigationNestedItemWithHrefType
  | NavigationNestedItemWithItemsType
