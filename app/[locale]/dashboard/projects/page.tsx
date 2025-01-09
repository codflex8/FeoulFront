import React from 'react'
import { projectsColumns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'

export interface Project  {
  projectNumber: string;
  projectName: string;
  location: string;
  city: string;
  status: "مسودة" | "منشور" | "محذوف";
  modelAdded: string;
};

export const projectsData: Project[] = [
  {
    projectNumber: "001",
    projectName: "مشروع بناء المساكن",
    location: "شارع الوحدة",
    city: "غزة",
    status: "مسودة",
    modelAdded: "نموذج 1",
  },
  {
    projectNumber: "002",
    projectName: "مشروع تطوير البنية التحتية",
    location: "حي الرمال",
    city: "خانيونس",
    status: "منشور",
    modelAdded: "نموذج 2",
  },
  {
    projectNumber: "003",
    projectName: "مشروع بناء المدارس",
    location: "الزهراء",
    city: "رفح",
    status: "محذوف",
    modelAdded: "نموذج 3",
  },
];

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={projectsColumns} data={projectsData} />
    </div>
  )
}

export default page
