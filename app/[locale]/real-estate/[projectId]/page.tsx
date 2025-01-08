"use client";

import React, { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import ControlFunctions from '@/components/ControlFunctions';
import WebsiteTitleSec from '@/components/WebsiteTitleSec';
import BuildingBlocksFiters from '@/components/BuildingBlocksFiters';
import HelppingTools from '@/components/HelppingTools';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NeedHelpForm from '@/components/NeedHelpForm';

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

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState(["category-a", "category-b", "category-c", "category-d"]);
  const [price, setPrice] = useState<[number, number]>([10000, 100000]);
  const [space, setSpace] = useState<[number, number]>([150, 400]);
  const [openHelpForm, setOpenHelpForm] = useState<boolean>(false);

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

  const handleShowBuildigsFilters = () => {
    setShowFilters(prev => !prev)
  }


  // Function to check screen width
  const checkScreenWidth = () => {
    setIsLargeScreen(window.innerWidth > 768);
  };

  useEffect(() => {
    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);

    };
  }, []);

  return (
    <div className="bg-[#544533] relative text-center min-h-[100vh] w-screen flex items-center justify-center py-4 overflow-x-hidden">

      <ControlFunctions zoomIn={zoomIn} zoomOut={zoomOut} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} setOpenHelpForm={setOpenHelpForm} />

      <div className={clsx("absolute top-4 z-[1000]", t("language").toLowerCase() === 'en' ? "right-[10px]" : "left-[10px]")}>
        <WebsiteTitleSec projectId="222" />

        <div className='w-fit'>
          <Button
            className='md:hidden w-full !bg-slate-600 text-white !justify-between'
            onClick={handleShowBuildigsFilters}>
            <span>فلاتر</span>
            <Image
              src="/assets/icons/left-arrow.svg"
              alt="arrow"
              width={32}
              height={32}
              className={clsx("transition-all", showFilters ? "rotate-90" : "-rotate-90")}
            />
          </Button>

          {/* Filters block */}

          <BuildingBlocksFiters
            className={(showFilters || isLargeScreen) ? "max-h-[800] py-2" : "max-h-0"}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            price={price}
            setPrice={setPrice}
            space={space}
            setSpace={setSpace} />

        </div>
      </div>
      <HelppingTools />

      <div>
        <h1>Filtered Buildings</h1>

        {/* <Image src='/assets/icons/test.svg' alt='' width={500} height={500} className='max-h-full max-w-full' /> */}
        {/* <ul>
          {filteredBuildings.map((building) => (
            <li key={building.id}>
              Building ID: {building.id}, Category: {building.category}, Price: {building.price}, Space: {building.space}
            </li>
          ))}
        </ul> */}

        {/* <Image width="2048" height="2048" preserveAspectRatio="none" id="image1" x="0" y="0" sodipodi:insensitive="true" className="fill-opacity:1;stroke:none;stroke-opacity:1;stroke-width:1.6;stroke-dasharray:none" /> */}
      </div>

      {/* Need Help Form Popup */}
      <Dialog open={openHelpForm} onOpenChange={setOpenHelpForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-xl font-extrabold">
              {t("NeedHelp")}
            </DialogTitle>
          </DialogHeader>
          <NeedHelpForm setOpen={setOpenHelpForm} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default page

