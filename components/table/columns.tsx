"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../dashboard/StatusBadge"
import { Button } from "../ui/button"

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Category, InterestsData, Project, Unit, Operation } from "@/types/dashboard.types";

const deleteRow = (id: string) => {
  console.log("iiii", id);
  
}
const updateRow = (id: string) => {
  console.log("ffff", id);
  
}

export const intrestsColumns: ColumnDef<InterestsData>[] = [
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
        onClick={() => { }}
      >
        <MdDelete color="red" className="!w-6 !h-6" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => { }}
      >
        <FaEdit color="gray" className="!w-6 !h-6" />
      </Button>
    </div>
  }
]

export const projectsColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectNumber",
    header: () => <div className="text-center font-semibold">رقم المشروع</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("projectNumber")}</p>,
  },
  {
    accessorKey: "projectName",
    header: () => <div className="text-center font-semibold">اسم المشروع</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("projectName")}</p>,
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center font-semibold">موقع المشروع</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("location")}</p>,
  },
  {
    accessorKey: "city",
    header: () => <div className="text-center font-semibold">المدينة</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("city")}</p>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center font-semibold">التاريخ</div>,
    cell: ({ row }) => {
      const rawDate = row.getValue("date") as string;
      const formattedDate = new Date(rawDate).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return <p className="text-center font-medium text-sm">{formattedDate}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center font-semibold">حالة المشروع</div>,
    cell: ({ row }) => <div className="flex justify-center">
      <span
        className={`flex w-fit items-center gap-2 rounded-full px-4 py-1 ${row.getValue("status") === "منشور"
          ? "bg-green-200 text-green-800"
          : row.getValue("status") === "مسودة"
            ? "bg-yellow-200 text-yellow-800"
            : "bg-red-200 text-red-800"
          }`}
      >
        {row.getValue("status")}
      </span>
    </div>
  },
  {
    accessorKey: "model",
    header: () => <div className="text-center font-semibold">نموذج المشروع</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("model")}</p>,
  },
  {
    id: "actions",
    header: () => <div className="text-center font-semibold">الإجراءات</div>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-1">
        <Button size="icon" variant="ghost" onClick={() => deleteRow(row.getValue("projectNumber"))}>
          <MdDelete color="red" className="!w-6 !h-6" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => updateRow(row.getValue("projectNumber"))}>
          <FaEdit color="gray" className="!w-6 !h-6" />
        </Button>
      </div>
    ),
  },
];

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center font-semibold">رقم الفئة</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("id")}</p>,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center font-semibold">اسم الفئة</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("name")}</p>,
  },
  {
    accessorKey: "color",
    header: () => <div className="text-center font-semibold">لون الفئة</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("color")}</p>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center font-semibold">حالة الفئة</div>,
    cell: ({ row }) => <div className="flex justify-center">
    <span
      className={`flex w-fit items-center gap-2 rounded-full px-4 py-1 ${row.getValue("status") === "منشور"
        ? "bg-green-200 text-green-800"
        : row.getValue("status") === "مسودة"
          ? "bg-yellow-200 text-yellow-800"
          : "bg-red-200 text-red-800"
        }`}
    >
      {row.getValue("status")}
    </span>
  </div>
  },
  {
    id: "actions",
    header: () => <div className="text-center font-semibold">الإجراءات</div>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-1">
        <Button size="icon" variant="ghost" onClick={() => {}}>
          <MdDelete color="red" className="!w-6 !h-6" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => {}}>
          <FaEdit color="gray" className="!w-6 !h-6" />
        </Button>
      </div>
    ),
  },
];

export const unitsColumns: ColumnDef<Unit>[] = [
  {
    accessorKey: 'number',
    header: () => <div className="text-center font-semibold">رقم الوحدة</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("number")}</p>
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center font-semibold">إسم الوحدة</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("name")}</p>
  },
  {
    accessorKey: "model",
    header: () => <div className="text-center font-semibold">النموذج</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("model")}</p>
  },
  {
    accessorKey: "landArea",
    header: () => <div className="text-center font-semibold">مساحة الأرض</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("landArea")}</p>
  },
  {
    accessorKey: "buildingArea",
    header: () => <div className="text-center font-semibold">مساحة البناء</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("buildingArea")}</p>
  },
  {
    accessorKey: "totalArea",
    header: () => <div className="text-center font-semibold">المساحة الإجمالية</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("totalArea")}</p>
  },
  {
    accessorKey: "bedrooms",
    header: () => <div className="text-center font-semibold">غرف النوم</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("bedrooms")}</p>
  },
  {
    accessorKey: "bathrooms",
    header: () => <div className="text-center font-semibold">دورات المياه</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("bathrooms")}</p>
  },
  {
    accessorKey: "floors",
    header: () => <div className="text-center font-semibold">عدد الطوابق</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("floors")}</p>
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center font-semibold">السعر</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("price")}</p>
  },
  {
    accessorKey: "videoUrl",
    header: () => <div className="text-center font-semibold">فيديو الوحدة</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <a href={row.getValue("videoUrl")} target="_blank" rel="noopener noreferrer" className="text-blue-600">
          مشاهدة الفيديو
        </a>
      </div>
    )
  },
  {
    id: "actions",
    header: () => <div className="text-center font-semibold">الإجراءات</div>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-1">
        <Button size="icon" variant="ghost" onClick={() => { }}>
          <MdDelete color="red" className="!w-6 !h-6" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => { }}>
          <FaEdit color="gray" className="!w-6 !h-6" />
        </Button>
      </div>
    )
  }
];

export const financialColumns: ColumnDef<Operation>[] = [
  {
    accessorKey: "number",
    header: () => <div className="text-center font-semibold">رقم</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("number")}</p>,
  },
  {
    accessorKey: "operationType",
    header: () => <div className="text-center font-semibold">نوع العملية</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("operationType")}</p>,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center font-semibold">وصف العملية</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("description")}</p>,
  },
  {
    accessorKey: "clientName",
    header: () => <div className="text-center font-semibold">اسم العميل</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("clientName")}</p>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center font-semibold">التاريخ</div>,
    cell: ({ row }) => <p className="text-center font-medium text-sm">{row.getValue("date")}</p>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center font-semibold">الحالة</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span
          className={`flex w-fit items-center gap-2 rounded-full px-4 py-1 ${row.getValue("status") === "مكتملة"
            ? "bg-green-200 text-green-800"
            : row.getValue("status") === "قيد التنفيذ"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
            }`}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
  },
];

