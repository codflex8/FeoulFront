"use client";

import CountsCard from "@/components/CountsCard";
import React, { useState, useEffect } from "react";
import { FaBell, FaHome, FaUsers, FaFolder, FaFileAlt, FaCog, FaChartBar, FaBook, FaClipboardList, FaCheckCircle, FaRobot } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { MdInterests } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { columns, InterestsData } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import MyChart from "@/components/MyChart";
import WeeklyChart from "@/components/WeeklyChart";

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
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = () => {
      const data = {
        labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
        datasets: [
          {
            label: "نشاط المستخدمين",
            data: [50, 70, 120, 90, 140],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      };
      setChartData(data);
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const barData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
    datasets: [
      {
        label: "نشاط المستخدمين",
        data: [50, 70, 120, 90, 140],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
    datasets: [
      {
        label: "معدل الزيارات",
        data: [100, 200, 150, 300, 250],
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["مجموعة 1", "مجموعة 2", "مجموعة 3"],
    datasets: [
      {
        label: "التوزيع النسبي",
        data: [30, 45, 25],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ["نشط", "غير نشط"],
    datasets: [
      {
        label: "حالة المستخدمين",
        data: [300, 150],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const chartDataInfo = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

  return (
    <div className="min-h-screen bg-gray-100 flex text-start">
      {/* sidebar */}
      {/* <aside className="w-64 bg-white shadow-md">
                <nav className="p-4 space-y-4">
                    <h1 className="text-xl font-bold text-gray-700">لوحة تحكم المسؤول</h1>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="block py-2 gap-3 px-4 rounded-lg bg-blue-500 text-white flex items-center space-x-2">
                                <FaHome className="text-lg" />
                                <span>لوحة التحكم</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 gap-3 px-4 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                                <FaUsers className="text-lg" />
                                <span>إدارة المستخدمين</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 gap-3 px-4 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                                <FaFolder className="text-lg" />
                                <span>المجموعات</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 gap-3 px-4 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                                <FaFileAlt className="text-lg" />
                                <span>الكتب والمجلدات</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 gap-3 px-4 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                                <FaChartBar className="text-lg" />
                                <span>تقارير الاختبارات</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 gap-3 px-4 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                                <FaCog className="text-lg" />
                                <span>الإعدادات</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside> */}

      {/* main content */}
      <main className="flex-1 p-6">
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

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-right">
          <WeeklyChart />

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-bold text-gray-700 mb-4">النشاط الشهري</h3>
            <MyChart />
          </div>
        </section>

        <DataTable columns={columns} data={data} />
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push('/ar/dashboard/interests')}
        >
          عرض كافة الإهتمامات
        </Button>
      </main>
    </div>
  );
};

export default Dashboard;