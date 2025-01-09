import Link from "next/link";
import { MdCategory, MdInterests } from "react-icons/md";
import { FaBuilding, FaBuildingCircleCheck, FaBuildingLock, FaMoneyBillTransfer } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
    url: "/dashboard",
    icon: BiSolidDashboard,
  },
  {
    title: "المشاريع",
    url: "/dashboard/projects",
    icon: FaCity,
  },
  {
    title: "الفئات",
    url: "/dashboard/categories",
    icon: MdCategory,
  },
  {
    title: "الإهتمامات",
    url: "/dashboard/interests",
    icon: MdInterests,
  },
  {
    title: "الوحدات السكنية",
    url: "/dashboard/buildings",
    icon: FaBuilding,
  },
  {
    title: "الوحدات السكنية المحجوزة",
    url: "/dashboard/booked-buildings",
    icon: FaBuildingLock,
  },
  {
    title: "الوحدات السكنية المباعة",
    url: "/dashboard/sold-buildings",
    icon: FaBuildingCircleCheck,
  },
  {
    title: "المالية",
    url: "/dashboard/financial",
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

      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="py-6" asChild>
                <Link href="/ar/dashboard/add-project">
                  <IoAdd className="!w-7 !h-7" />
                  <span className="text-gray-600 text-base font-semibold">إضافة مشروع</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
