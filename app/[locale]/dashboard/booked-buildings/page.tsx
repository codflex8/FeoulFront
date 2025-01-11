import React from 'react'
import { unitsColumns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'
import { unitData } from '@/dummyData'

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={unitsColumns} data={unitData} />
    </div>
  )
}

export default page
