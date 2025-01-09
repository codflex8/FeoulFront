import React from 'react'
import { intrestsColumns, InterestsData } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'

export const data: InterestsData[] = [
  {
    // id: "1",
    firstName: "محمد",
    surName: "الزهراني",
    phone: "0551234567",
    email: "mohammed.zahrani@example.com",
    region: "المركز",
    buildingNumber: 101,
    buildingStatus: "متاح",
  },
  {
    // id: "2",
    firstName: "فاطمة",
    surName: "الأنصاري",
    phone: "0569876543",
    email: "fatima.ansari@example.com",
    region: "الشرقي",
    buildingNumber: 202,
    buildingStatus: "محجوز",
  },
  {
    // id: "3",
    firstName: "علي",
    surName: "الغامدي",
    phone: "0547654321",
    email: "ali.ghamdi@example.com",
    region: "الغربي",
    buildingNumber: 303,
    buildingStatus: "مباع",
  },
  {
    // id: "4",
    firstName: "نور",
    surName: "الشريف",
    phone: "0538765432",
    email: "noor.shareef@example.com",
    region: "المركز",
    buildingNumber: 404,
    buildingStatus: "متاح",
  },
  {
    // id: "5",
    firstName: "سارة",
    surName: "العتيبي",
    phone: "0581239876",
    email: "sarah.otaibi@example.com",
    region: "الشرقي",
    buildingNumber: 505,
    buildingStatus: "مباع",
  },
  {
    // id: "6",
    firstName: "أحمد",
    surName: "الخطيب",
    phone: "0523456789",
    email: "ahmed.khateeb@example.com",
    region: "الغربي",
    buildingNumber: 606,
    buildingStatus: "محجوز",
  },
  {
    // id: "7",
    firstName: "لمياء",
    surName: "الحربي",
    phone: "0572345678",
    email: "lamya.harbi@example.com",
    region: "المركز",
    buildingNumber: 707,
    buildingStatus: "متاح",
  },
  {
    // id: "8",
    firstName: "خالد",
    surName: "المطيري",
    phone: "0598765432",
    email: "khaled.mutairi@example.com",
    region: "الشرقي",
    buildingNumber: 808,
    buildingStatus: "مباع",
  },
  {
    // id: "5",
    firstName: "سارة",
    surName: "العتيبي",
    phone: "0581239876",
    email: "sarah.otaibi@example.com",
    region: "الشرقي",
    buildingNumber: 505,
    buildingStatus: "مباع",
  },
  {
    // id: "6",
    firstName: "أحمد",
    surName: "الخطيب",
    phone: "0523456789",
    email: "ahmed.khateeb@example.com",
    region: "الغربي",
    buildingNumber: 606,
    buildingStatus: "محجوز",
  },
  {
    // id: "7",
    firstName: "لمياء",
    surName: "الحربي",
    phone: "0572345678",
    email: "lamya.harbi@example.com",
    region: "المركز",
    buildingNumber: 707,
    buildingStatus: "متاح",
  },
  {
    // id: "8",
    firstName: "خالد",
    surName: "المطيري",
    phone: "0598765432",
    email: "khaled.mutairi@example.com",
    region: "الشرقي",
    buildingNumber: 808,
    buildingStatus: "مباع",
  },
];

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={intrestsColumns} data={data} />
    </div>
  )
}

export default page
