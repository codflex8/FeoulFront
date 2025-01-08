"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { Button } from "../ui/button"

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export type InterestsData = {
  firstName: string
  surName: string
  phone: string
  email: string
  region: "المركز" | "الشرقي" | "الغربي"
  buildingNumber: number
  buildingStatus: "متاح" | "محجوز" | "مباع"
}

export const columns: ColumnDef<InterestsData>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-center font-semibold">معرف</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.index + 1}</p>

  },
  {
    accessorKey: "firstName",
    header: () => <div className="text-center font-semibold">الإسم الأول</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("firstName")}</p>
  },
  {
    accessorKey: "surName",
    header: () => <div className="text-center font-semibold">إسم العائلة</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("surName")}</p>
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center font-semibold">رقم الهاتف</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("phone")}</p>
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center font-semibold">الإيميل</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("email")}</p>
  },
  {
    accessorKey: "region",
    header: () => <div className="text-center font-semibold">المنطقة</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("region")}</p>
  },
  {
    accessorKey: "buildingNumber",
    header: () => <div className="text-center font-semibold">رقم الوحدة السكنية</div>,
    cell: ({ row }) => <p className="text-center  font-medium">{row.getValue("buildingNumber")}</p>
  },
  {
    accessorKey: "buildingStatus",
    header: () => <div className="text-center font-semibold">حالة الوحدة السكنية</div>,
    cell: ({ row }) => <div className="flex justify-center items-center">
      <StatusBadge status={row.original.buildingStatus} />
    </div>
  },
  {
    id: "actions",
    header: () => <div className="text-center font-semibold">الإجراءات</div>,
    cell: ({ row }) => <div className="flex justify-center items-center gap-1">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => {}}
      >
        <MdDelete color="red" className="!w-6 !h-6" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => {}}
      >
        <FaEdit color="gray" className="!w-6 !h-6" />
      </Button>
    </div>
  }
]
