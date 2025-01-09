"use client";

import CountsCard from "@/components/CountsCard";
import { FaUsers } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { MdInterests } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";

import { intrestsColumns, InterestsData } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import WeeklyChart from "@/components/WeeklyChart";
import BuildingsChart from "@/components/BuildingsChart";

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

const Dashboard: React.FC = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">

      {/* main content */}
      {/* <header className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-700">نظرة عامة</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="بحث..."
              className="py-2 px-4 border rounded-lg"
            />
            <button className="p-2 bg-blue-500 text-white rounded-lg flex items-center">
              <FaBell className="text-lg" />
            </button>
          </div>
        </header> */}

      {/* Cards Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 text-right">
        <CountsCard icon={FaUsers} label="عدد الزائرين" value={665} color="#8280FF" background="#D6D4FF" />
        <CountsCard icon={FaCity} label="عدد المشاريع" value={150} color="#FEC53D" background="#FFE8B3" />
        <CountsCard icon={FaBuilding} label="عدد الوحدات السكنية" value={760} color="#4AD991" background="#B3F0D3" />
        <CountsCard icon={MdInterests} label="عدد الإهتمامات" value={222} color="#FF9066" background="#FFD4BF" />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-right">
        <WeeklyChart />
        <BuildingsChart />
      </section>

      {/* Table Section */}
      <DataTable page="dashboard" columns={intrestsColumns} data={data} />
      <Button
        variant="outline"
        size="lg"
        onClick={() => router.push('/ar/dashboard/interests')}
        className="mt-4"
      >
        عرض كافة الإهتمامات
      </Button>
    </div>
  );
};

export default Dashboard;