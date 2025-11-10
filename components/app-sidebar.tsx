"use client"

import * as React from "react"
import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconSettings,
  IconDatabase,
  IconReport,
  IconInnerShadowTop,
  IconFolderFilled,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const iconMap = {
  dashboard: IconDashboard,
  "list-details": IconListDetails,
  "chart-bar": IconChartBar,
  folder: IconFolder,
  settings: IconSettings,
  database: IconDatabase,
  report: IconReport,
}

export interface NavItem {
  title: string
  url: string
  icon: keyof typeof iconMap
}

export interface DocumentItem {
  name: string
  url: string
  icon: keyof typeof iconMap
}

export interface User {
  name: string
  email: string
  avatar: string
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navItems: NavItem[]
  documents: DocumentItem[]
  navSecondary: NavItem[]
  user: User
}

export function AppSidebar({
  navItems,
  documents,
  navSecondary,
  user,
  variant,
  ...props
}: AppSidebarProps) {
  const resolveIcons = <T extends { icon: keyof typeof iconMap }>(items: T[]) =>
    items.map((item) => ({
      ...item,
      icon: iconMap[item.icon] ?? IconFolderFilled,
    }))
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={resolveIcons(navItems)} />
        {documents.length == 0 ? null :
          <NavDocuments items={resolveIcons(documents)} />
        }
        <NavSecondary
          items={resolveIcons(navSecondary)}
          className="mt-auto"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
