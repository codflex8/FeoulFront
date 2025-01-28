import React from 'react'
import { unitsColumns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'
import { getUnits } from '@/lib/actions/dashboard.actions'

const page =  async () => {
  const units = await getUnits();
  const saledUnits = units.items?.filter((unit: { status: string }) => unit.status === 'saled') || [];

  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={unitsColumns} data={saledUnits} />
    </div>
  )
}

export default page
