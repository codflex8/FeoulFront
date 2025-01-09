import { categoriesColumns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import React from 'react'

export type Category = {
  id: number;
  name: string;
  color: string;
  status: "مسودة" | "منشور" | "محذوف";
};

export const categoriesData: Category[] = [
  { id: 1, name: "فئة A", color: "أزرق", status: "منشور" },
  { id: 2, name: "فئة B", color: "أخضر", status: "مسودة" },
  { id: 3, name: "فئة C", color: "أصفر", status: "محذوف" },
  { id: 4, name: "فئة D", color: "أحمر", status: "منشور" },
];


const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={categoriesColumns} data={categoriesData} />
    </div>
  )
}

export default page
