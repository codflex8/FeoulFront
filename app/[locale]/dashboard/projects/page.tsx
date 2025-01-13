"use client";

import React, { useState } from 'react'
import { getProjectsColumns } from "@/components/table/columns";
import { DataTable } from '@/components/table/data-table'
import { projectsData } from '@/dummyData'
import { Project } from '@/types/dashboard.types'

const page = () => {

  const [data, setData] = useState<Project[]>(projectsData); // Replace with your data fetching logic

  const deleteRow = async (projectNumber: string) => {
    try {
      const response = await fetch(`http://18.116.28.100/api/v1/dashboard/projects/${projectNumber}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      const updatedData = data.filter((project) => project.projectNumber !== projectNumber);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const updateRow = async (updatedData: Project) => {
    try {
      const response = await fetch(`http://18.116.28.100/api/v1/dashboard/projects/${updatedData.projectNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const updatedProjects = data.map((project) =>
        project.projectNumber === updatedData.projectNumber ? updatedData : project
      );
      setData(updatedProjects);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const updateFields = [
    { key: "projectName", label: "اسم المشروع" },
    { key: "location", label: "موقع المشروع" },
    { key: "city", label: "المدينة" },
  ];

  const columns = getProjectsColumns(deleteRow, updateRow);

  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      <DataTable
        page="projects"
        columns={columns}
        data={data}
        deleteRow={deleteRow}
        updateRow={updateRow}
        updateFields={updateFields}
      />
    </div>
  );

}

export default page
