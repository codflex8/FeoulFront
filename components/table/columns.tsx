"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../dashboard/StatusBadge";
import { Button } from "../ui/button";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {
  Category,
  InterestsData,
  Project,
  Unit,
  Operation,
} from "@/types/dashboard.types";
import FloorDesignsPopup from "@/components/dashboard/FloorDesignsPopup";
import VideoPopup from "@/components/VideoPopup";

export const intrestsColumns: ColumnDef<InterestsData>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center font-semibold">معرف</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.index + 1}</p>
    ),
  },
  {
    accessorKey: "firstName",
    header: () => <div className="text-center font-semibold">الإسم الأول</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("firstName")}
      </p>
    ),
  },
  {
    accessorKey: "surName",
    header: () => <div className="text-center font-semibold">إسم العائلة</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("surName")}
      </p>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center font-semibold">رقم الهاتف</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("phone")}</p>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center font-semibold">الإيميل</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("email")}</p>
    ),
  },
  {
    accessorKey: "region",
    header: () => <div className="text-center font-semibold">المنطقة</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("region")}
      </p>
    ),
  },
  {
    accessorKey: "buildingNumber",
    header: () => (
      <div className="text-center font-semibold">رقم الوحدة السكنية</div>
    ),
    cell: ({ row }) => (
      <p className="text-center  font-medium">
        {row.getValue("buildingNumber")}
      </p>
    ),
  },
  {
    accessorKey: "buildingStatus",
    header: () => (
      <div className="text-center font-semibold">حالة الوحدة السكنية</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <StatusBadge status={row.original.buildingStatus} />
      </div>
    ),
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

export const getProjectsColumns = (
  deleteRow: (id: string) => void,
  updateRow: (rowData: Project) => void
): ColumnDef<Project>[] => [
  {
    accessorKey: "projectNumber",
    header: () => <div className="text-center font-semibold">رقم المشروع</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("projectNumber")}
      </p>
    ),
  },
  {
    accessorKey: "projectName",
    header: () => <div className="text-center font-semibold">اسم المشروع</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("projectName")}
      </p>
    ),
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center font-semibold">موقع المشروع</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("location")}
      </p>
    ),
  },
  {
    accessorKey: "city",
    header: () => <div className="text-center font-semibold">المدينة</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("city")}</p>
    ),
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
    filterFn: (row, columnId, filterValue) => {
      const rawDate = row.getValue(columnId) as string;
      const rowDate = new Date(rawDate);

      const rowDateNormalized = new Date(
        rowDate.getFullYear(),
        rowDate.getMonth(),
        rowDate.getDate()
      ).getTime();

      const filterDateNormalized = new Date(filterValue).setHours(0, 0, 0, 0);

      return rowDateNormalized === filterDateNormalized;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center font-semibold">حالة المشروع</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span
          className={`flex w-fit items-center gap-2 rounded-full px-4 py-1 ${
            row.getValue("status") === "منشور"
              ? "bg-green-200 text-green-800"
              : row.getValue("status") === "مسودة"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "model",
    header: () => (
      <div className="text-center font-semibold">نموذج المشروع</div>
    ),
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("model")}</p>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center font-semibold">الإجراءات</div>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => deleteRow(row.getValue("projectNumber"))}
        >
          <MdDelete color="red" className="!w-6 !h-6" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => updateRow(row.original)}
        >
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
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("id")}</p>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center font-semibold">اسم الفئة</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("name")}</p>
    ),
  },
  {
    accessorKey: "color",
    header: () => <div className="text-center font-semibold">لون الفئة</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("color")}</p>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center font-semibold">حالة الفئة</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span
          className={`flex w-fit items-center gap-2 rounded-full px-4 py-1 ${
            row.getValue("status") === "منشور"
              ? "bg-green-200 text-green-800"
              : row.getValue("status") === "مسودة"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
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
    accessorKey: "number",
    header: () => <div className="text-center font-semibold">رقم الوحدة</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("number")}
      </p>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center font-semibold">إسم الوحدة</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("name")}</p>
    ),
  },
  {
    accessorKey: "estate",
    header: () => <div className="text-center font-semibold">المشروع</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("estate")}
      </p>
    ),
  },
  {
    accessorKey: "model",
    header: () => <div className="text-center font-semibold">النموذج</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("model")}</p>
    ),
  },
  {
    accessorKey: "landArea",
    header: () => <div className="text-center font-semibold">مساحة الأرض</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("landArea")}
      </p>
    ),
  },
  {
    accessorKey: "buildingArea",
    header: () => <div className="text-center font-semibold">مساحة البناء</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("buildingArea")}
      </p>
    ),
  },
  {
    accessorKey: "totalArea",
    header: () => (
      <div className="text-center font-semibold">المساحة الإجمالية</div>
    ),
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("totalArea")}
      </p>
    ),
  },
  {
    accessorKey: "bedrooms",
    header: () => <div className="text-center font-semibold">غرف النوم</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("bedrooms")}
      </p>
    ),
  },
  {
    accessorKey: "bathrooms",
    header: () => <div className="text-center font-semibold">دورات المياه</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("bathrooms")}
      </p>
    ),
  },
  {
    accessorKey: "floors",
    header: () => <div className="text-center font-semibold">عدد الطوابق</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("floors")}
      </p>
    ),
  },
  {
    accessorKey: "floorsDesign",
    header: () => (
      <div className="text-center font-semibold">تصميم الطوابق</div>
    ),
    cell: ({ row }) => {
      const [isFloorDesignsPopupOpen, setIsFloorDesignsPopupOpen] =
        useState(false);
      const floorDesigns = row.getValue("floorsDesign") as string[];

      return (
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setIsFloorDesignsPopupOpen(true)}
            className="text-blue-600"
          >
            عرض الطوابق
          </Button>
          <FloorDesignsPopup
            floorDesigns={floorDesigns}
            isOpen={isFloorDesignsPopupOpen}
            onClose={() => setIsFloorDesignsPopupOpen(false)}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center font-semibold">السعر</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("price")}</p>
    ),
  },
  {
    accessorKey: "videoUrl",
    header: () => <div className="text-center font-semibold">فيديو الوحدة</div>,
    cell: ({ row }) => {
      const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);

      return (
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setIsVideoPopupOpen(true)}
            className="text-blue-600"
          >
            مشاهدة الفيديو
          </Button>
          <VideoPopup
            videoUrl={row.getValue("videoUrl")}
            isOpen={isVideoPopupOpen}
            onClose={() => setIsVideoPopupOpen(false)}
          />
        </div>
      );
    },
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

export const financialColumns: ColumnDef<Operation>[] = [
  {
    accessorKey: "number",
    header: () => <div className="text-center font-semibold">رقم</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("number")}
      </p>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center font-semibold">رقم البناية</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">{row.getValue("name")}</p>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center font-semibold">السعر</div>,
    cell: ({ row }) => (
      <p className="text-center font-medium text-sm">
        {row.getValue("price")} ريال
      </p>
    ),
  },
  {
    accessorKey: "interests",
    header: () => <div className="text-center font-semibold">اسم العميل</div>,
    cell: ({ row }) => {
      const interests = row.getValue("interests");

      if (Array.isArray(interests) && interests.length > 0) {
        const { firstName, lastName } = interests[0]; // استخراج أول عنصر
        return (
          <p className="text-center font-medium text-sm">
            {firstName} {lastName}
          </p>
        );
      }

      return <p className="text-center font-medium text-sm">غير متوفر</p>;
    },
  },
  {
    accessorKey: "interests",
    header: () => <div className="text-center font-semibold">التاريخ</div>,
    cell: ({ row }) => {
      const interests = row.getValue("interests");

      if (Array.isArray(interests) && interests.length > 0) {
        const createdAt = interests[0].createdAt;
        const formattedDate = new Date(createdAt).toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return (
          <p className="text-center font-medium text-sm">{formattedDate}</p>
        );
      }

      return <p className="text-center font-medium text-sm">غير متوفر</p>;
    },
  },
  {
    accessorKey: "interests",
    header: () => <div className="text-center font-semibold">الحالة</div>,
    cell: ({ row }) => {
      const interests = row.getValue("interests");
  
      // تحقق من وجود بيانات في مصفوفة interests
      if (Array.isArray(interests) && interests.length > 0) {
        const status = interests[0].status; // استخراج status لأول عنصر
  
        return (
          <div className="flex justify-center">
            <span
              className={`flex w-fit items-center gap-2 rounded-full px-4 py-1 ${
                status === "مكتملة"
                  ? "bg-green-200 text-green-800"
                  : status === "قيد التنفيذ"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {status}
            </span>
          </div>
        );
      }
  
      // إذا لم تكن هناك بيانات
      return (
        <div className="flex justify-center">
          <span className="bg-gray-200 text-gray-800 flex w-fit items-center gap-2 rounded-full px-4 py-1">
            غير متوفر
          </span>
        </div>
      );
    },
  }
  
];
