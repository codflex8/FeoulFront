import React from 'react'
import { projectsColumns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'
import { projectsData } from '@/dummyData'

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable page="projects" columns={projectsColumns} data={projectsData} />
    </div>
  )
}

export default page
