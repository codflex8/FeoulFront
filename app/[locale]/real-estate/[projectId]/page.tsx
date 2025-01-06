"use client";

import React, { useState } from 'react'
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import ControlFunctions from '@/components/ControlFunctions';
import WebsiteTitleSec from '@/components/WebsiteTitleSec';
import BuildingBlocksFiters from '@/components/BuildingBlocksFiters';
import HelppingTools from '@/components/HelppingTools';

interface BuildingProps {
  id: number;
  category: "category-a" | "category-b" | "category-c" | "category-d";
  price: number;
  space: number;
}

const page = (
  {
    // params
  }: {
      // params: Promise<{ projectId: string }>
    }) => {
  // const projectId = (await params).projectId;
  const t = useTranslations('ProjectPage');

  const [scale, setScale] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState(["category-a", "category-b", "category-c", "category-d"]);
  const [price, setPrice] = useState<[number, number]>([10000, 100000]);
  const [space, setSpace] = useState<[number, number]>([150, 400]);

  const buildings: BuildingProps[] = [
    { id: 1, category: "category-a", price: 500, space: 500 },
    { id: 2, category: "category-b", price: 600, space: 600 },
    { id: 3, category: "category-c", price: 900, space: 900 },
    { id: 4, category: "category-d", price: 1000, space: 1000 },
    { id: 5, category: "category-a", price: 500, space: 500 },
    { id: 6, category: "category-b", price: 400, space: 400 },
    { id: 7, category: "category-c", price: 500, space: 500 },
    { id: 8, category: "category-d", price: 300, space: 300 },
    { id: 9, category: "category-a", price: 5500, space: 5500 },
    { id: 10, category: "category-b", price: 5200, space: 5200 },
    { id: 11, category: "category-c", price: 5400, space: 5400 },
    { id: 12, category: "category-d", price: 500, space: 500 },
  ];

  const filteredBuildings = buildings.filter((building) =>
    selectedCategories.includes(building.category) &&
    (building.price >= price[0] && building.price <= price[1]) &&
    ((building.space >= space[0] && building.space <= space[1]))
  );

  const zoomStep = 0.2;

  const zoomIn = () => {
    if (scale <= 1) {
      setScale((prev) => prev + zoomStep)
    }
  };
  const zoomOut = () => {
    if (scale <= 2 && scale >= 0.6) {
      setScale((prev) => (prev > zoomStep ? prev - zoomStep : prev))
    }
  };

  return (
    <div className="bg-[#544533] relative text-center min-h-[100vh] w-screen flex items-center justify-center py-4 overflow-x-hidden">

      <ControlFunctions zoomIn={zoomIn} zoomOut={zoomOut} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />

      <div className={clsx("absolute top-4 z-[1000]", t("language").toLowerCase() === 'en' ? "right-[10px]" : "left-[10px]")}>
        <WebsiteTitleSec projectId="222" />

        <BuildingBlocksFiters selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} price={price} setPrice={setPrice} space={space} setSpace={setSpace} />
      </div>
      <HelppingTools />

      <div>
        <h1>Filtered Buildings</h1>
        <ul>
          {filteredBuildings.map((building) => (
            <li key={building.id}>
              Building ID: {building.id}, Category: {building.category}, Price: {building.price}, Space: {building.space}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default page
