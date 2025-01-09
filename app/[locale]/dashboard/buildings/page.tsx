import React from 'react'
import { unitsColumns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'

interface Unit  {
  number: string;
  name: string;
  model: string;
  landArea: string;
  buildingArea: string;
  totalArea: string;
  bedrooms: number;
  bathrooms: number;
  price: string;
  videoUrl: string;
  floors: number;
};

const unitData: Unit[] = [
  {
    number: "001",
    name: "وحدة سكنية 1",
    model: "موديل A",
    landArea: "300 متر مربع",
    buildingArea: "250 متر مربع",
    totalArea: "550 متر مربع",
    bedrooms: 3,
    bathrooms: 2,
    price: "500,000 شيكل",
    videoUrl: "https://example.com/video1",
    floors: 2
  },
  {
    number: "002",
    name: "وحدة سكنية 2",
    model: "موديل B",
    landArea: "350 متر مربع",
    buildingArea: "300 متر مربع",
    totalArea: "650 متر مربع",
    bedrooms: 4,
    bathrooms: 3,
    price: "600,000 شيكل",
    videoUrl: "https://example.com/video2",
    floors: 3
  },
  {
    number: "003",
    name: "وحدة سكنية 3",
    model: "موديل C",
    landArea: "400 متر مربع",
    buildingArea: "350 متر مربع",
    totalArea: "750 متر مربع",
    bedrooms: 5,
    bathrooms: 4,
    price: "750,000 شيكل",
    videoUrl: "https://example.com/video3",
    floors: 3
  },
  {
    number: "001",
    name: "وحدة سكنية 1",
    model: "موديل A",
    landArea: "300 متر مربع",
    buildingArea: "250 متر مربع",
    totalArea: "550 متر مربع",
    bedrooms: 3,
    bathrooms: 2,
    price: "500,000 شيكل",
    videoUrl: "https://example.com/video1",
    floors: 2
  },
  {
    number: "002",
    name: "وحدة سكنية 2",
    model: "موديل B",
    landArea: "350 متر مربع",
    buildingArea: "300 متر مربع",
    totalArea: "650 متر مربع",
    bedrooms: 4,
    bathrooms: 3,
    price: "600,000 شيكل",
    videoUrl: "https://example.com/video2",
    floors: 3
  },
  {
    number: "003",
    name: "وحدة سكنية 3",
    model: "موديل C",
    landArea: "400 متر مربع",
    buildingArea: "350 متر مربع",
    totalArea: "750 متر مربع",
    bedrooms: 5,
    bathrooms: 4,
    price: "750,000 شيكل",
    videoUrl: "https://example.com/video3",
    floors: 3
  }
];

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      {/* Table Section */}
      <DataTable columns={unitsColumns} data={unitData} />
    </div>
  )
}

export default page
