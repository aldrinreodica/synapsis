'use client'

// Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from '../ui/sidebar'
import Link from 'next/link'
import { navigationsData } from '@/data/navigations'
import { NavigationNestedItem, NavigationRootItem } from '@/types'
import { isActivePathname } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { DynamicIcon } from '../DynamicIcon'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { Badge } from '../ui/badge'
import { ChevronDown } from 'lucide-react'

const AppSidebar = ({ ...props }) => {
  const pathname = usePathname()
  const renderMenuItem = (item: NavigationRootItem | NavigationNestedItem) => {
    if (item.items) {
      return (
        <Collapsible className="group/collapsible">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="w-full justify-between [&[data-state=open]>svg]:rotate-180">
              <span className="flex items-center">
                {'iconName' in item && (
                  <DynamicIcon name={item.iconName} className="me-2 h-4 w-4" />
                )}
                <span>{item.title}</span>
                {'label' in item && (
                  <Badge variant="secondary" className="me-2">
                    {item.label}
                  </Badge>
                )}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub>
              {item.items.map((subItem: NavigationNestedItem) => (
                <SidebarMenuItem key={subItem.title}>
                  {renderMenuItem(subItem)}
                </SidebarMenuItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      )
    }

    if ('href' in item) {
      const isActive = isActivePathname(item.href, pathname)

      return (
        <SidebarMenuButton isActive={isActive} asChild>
          <Link href={item.href}>
            {'iconName' in item && (
              <DynamicIcon name={item.iconName} className="h-4 w-4" />
            )}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      )
    }
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          href="/"
          className="w-fit flex text-foreground font font-black p-2 pb-0 mb-2"
        >
          <span>Synapsis</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {navigationsData.map((nav) => (
          <SidebarGroup key={nav.title}>
            <SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {renderMenuItem(item)}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar
