import Link from "next/link";
import { MdCategory, MdInterests } from "react-icons/md";
import { FaBuilding, FaBuildingCircleCheck, FaBuildingLock, FaMoneyBillTransfer } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCity } from "react-icons/fa";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


interface ItemsProps {
  title: string,
  url: string,
  icon: React.ElementType,
}

// Menu items.
const items: ItemsProps[] = [
  {
    title: "لوحة التحكم",
    url: "ar/dashboard",
    icon: BiSolidDashboard,
  },
  {
    title: "المشاريع",
    url: "ar/dashboard/projects",
    icon: FaCity,
  },
  {
    title: "الفئات",
    url: "ar/dashboard/categories",
    icon: MdCategory,
  },
  {
    title: "الإهتمامات",
    url: "ar/dashboard/interests",
    icon: MdInterests,
  },
  {
    title: "الوحدات السكنية",
    url: "ar/dashboard/buildings",
    icon: FaBuilding,
  },
  {
    title: "الوحدات السكنية المحجوزة",
    url: "ar/dashboard/booked-buildings",
    icon: FaBuildingLock,
  },
  {
    title: "الوحدات السكنية المباعة",
    url: "ar/dashboard/sold-buildings",
    icon: FaBuildingCircleCheck,
  },
  {
    title: "المالية",
    url: "ar/dashboard/financial",
    icon: FaMoneyBillTransfer,
  },
]

export default function DashboardSidebar() {
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-extrabold text-black my-4">لوحة تحكم المسؤول</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="py-6" asChild>
                    <Link href={item.url}>
                      <item.icon className="!w-6 !h-6" />
                      <span className="text-gray-600 text-base font-semibold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
