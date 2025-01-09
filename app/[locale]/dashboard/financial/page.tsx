import { financialColumns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import React from 'react'

export type Operation = {
  number: number;
  operationType: string; 
  description: string;
  clientName: string; 
  date: string; 
  status: string; 
};

export const financialData: Operation[] = [
  {
    number: 1,
    operationType: "بيع",
    description: "بيع شقة جديدة",
    clientName: "أحمد علي",
    date: "2025-01-01",
    status: "مكتملة",
  },
  {
    number: 2,
    operationType: "تأجير",
    description: "تأجير مكتب",
    clientName: "سارة محمد",
    date: "2025-01-05",
    status: "قيد التنفيذ",
  },
  {
    number: 3,
    operationType: "إيجار",
    description: "إيجار مخزن",
    clientName: "خالد سمير",
    date: "2025-01-07",
    status: "مرفوضة",
  },
  {
    number: 4,
    operationType: "شراء",
    description: "شراء أرض",
    clientName: "هند سعيد",
    date: "2025-01-09",
    status: "مكتملة",
  },
  {
    number: 1,
    operationType: "بيع",
    description: "بيع شقة جديدة",
    clientName: "أحمد علي",
    date: "2025-01-01",
    status: "مكتملة",
  },
  {
    number: 2,
    operationType: "تأجير",
    description: "تأجير مكتب",
    clientName: "سارة محمد",
    date: "2025-01-05",
    status: "قيد التنفيذ",
  },
  {
    number: 3,
    operationType: "إيجار",
    description: "إيجار مخزن",
    clientName: "خالد سمير",
    date: "2025-01-07",
    status: "مرفوضة",
  },
  {
    number: 4,
    operationType: "شراء",
    description: "شراء أرض",
    clientName: "هند سعيد",
    date: "2025-01-09",
    status: "مكتملة",
  },
];


const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={financialColumns} data={financialData} />
    </div>
  )
}

export default page

