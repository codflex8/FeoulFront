import { financialColumns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { financialData } from '@/dummyData';
import React from 'react'


const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={financialColumns} data={financialData} />
    </div>
  )
}

export default page

