"use client";

import React, { useState } from 'react'
import { getProjectsColumns } from "@/components/table/columns";
import { DataTable } from '@/components/table/data-table'
import { Project } from '@/types/dashboard.types'

const ProjectsPageClient = ({ projects }: { projects: Project[] }) => {

  const [data, setData] = useState<Project[]>(projects); 

  const deleteRow = async (number: string) => {
    try {
      const response = await fetch(`http://18.116.28.100/api/v1/dashboard/projects/${number}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      const updatedData = data.filter((project) => project.number !== number);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const updateRow = async (updatedData: Project) => {
    try {
      const response = await fetch(`http://18.116.28.100/api/v1/dashboard/projects/${updatedData.number}`, {
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
        project.number === updatedData.number ? updatedData : project
      );
      setData(updatedProjects);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const updateFields: { key: keyof Project; label: string }[] = [
    { key: "name", label: "اسم المشروع" },
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

export default ProjectsPageClient
