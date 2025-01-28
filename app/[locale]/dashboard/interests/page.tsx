import { intrestsColumns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'
import { interestsData } from '@/dummyData'
import { getInterests } from '@/lib/actions/dashboard.actions'

const page = async () => {
  const interests = await getInterests()

  console.log("interests from Dashboard", interests);

  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={intrestsColumns} data={interests.items || []} />
    </div>
  )
}

export default page
