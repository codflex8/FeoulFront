"use client";

import CountsCard from "@/components/dashboard/CountsCard";
import { FaUsers } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { MdInterests } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { intrestsColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import BuildingsChart from "@/components/dashboard/BuildingsChart";
import { Interest, Project, Unit } from "@/types/dashboard.types";

interface DashboardPageProps {
  projects: Project[];
  units: Unit[];
  interests: Interest[];
}

const DashboardPageClient: React.FC<DashboardPageProps> = ({ projects, units, interests }) => {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">

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
      <DataTable page="dashboard" columns={intrestsColumns} data={interests} />
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

export default DashboardPageClient;