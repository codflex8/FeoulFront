import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from 'react'
import { SidebarTrigger } from "./ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { Separator } from "./ui/separator"

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between pl-6 pr-2 py-4">
      <SidebarTrigger className="w-10 h-10" />

      {/* User Profile Section */}
      <div className="flex items-center gap-4">
        <DropdownMenu >
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-100 ml-4">
            <DropdownMenuItem>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem className="text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </div>
  )
}

export default DashboardHeader