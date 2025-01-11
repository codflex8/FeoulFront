import React from 'react'
import { intrestsColumns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'
import { interestsData } from '@/dummyData'

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={intrestsColumns} data={interestsData} />
    </div>
  )
}

export default page
