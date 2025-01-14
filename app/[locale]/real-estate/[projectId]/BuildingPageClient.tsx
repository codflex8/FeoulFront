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
import NeedHelpForm from '@/components/form/NeedHelpForm';
import { Categories, Project } from '@/types/map.types';

import { MapContainer, ImageOverlay, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface BuildingProps {
  id: number;
  category: string;
  price: number;
  space: number;
}

const page = ({ project, categories }: { project: Project, categories: string[] }) => {
  const t = useTranslations('ProjectPage');

  const imageUrl = '/assets/images/project.jpg'; // استبدل بمسار الصورة
  const imageBounds: L.LatLngBoundsExpression = [
    [0, 0], // الحد الأدنى للإحداثيات (أسفل اليسار)
    [1000, 1000], // الحد الأقصى للإحداثيات (أعلى اليمين)
  ];


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


  const units = [
    {
      id: 1,
      name: 'Building 1',
      position: [200, 200], // الإحداثيات النسبية للمبنى
      size: [120, 366], // حجم المبنى (عرض × ارتفاع)
    },
    {
      id: 2,
      name: 'Building 2',
      position: [400, 400],
      size: [120, 457],
    },
    {
      id: 3,
      name: 'Building 3',
      position: [268, 184],
      size: [120, 457],
    },
    // أضف بقية المباني هنا
  ];

  const DynamicMarker = ({ building }: { building: any }) => {
    const map = useMap();
    const [zoomLevel, setZoomLevel] = useState(map.getZoom());

    useMapEvent('zoomend', () => {
      setZoomLevel(map.getZoom());
    });

    const iconSize = [
      building.size[0] * (zoomLevel / 2), 
      building.size[1] * (zoomLevel / 2),
    ];

    const icon = L.divIcon({
      className: 'custom-icon',
      html: `<div style="background: rgba(255, 0, 0, 0.5); width: ${iconSize[0]}px; height: ${iconSize[1]}px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; transition: all 0.3s ease">${building.id}</div>`,
    });

    return <Marker position={building.position} icon={icon} />;
  };

  const FitBoundsToImage = ({ bounds }: { bounds: L.LatLngBoundsExpression }) => {
    const map = useMap();
    
    React.useEffect(() => {
      map.fitBounds(bounds, { padding: [20, 20] }); // إضافة حواف بسيطة
    }, [map, bounds]);
  
    return null;
  };

  return (
    <div className="bg-[#544533] relative text-center min-h-[100vh] w-screen flex items-center justify-center overflow-x-hidden">

      <ControlFunctions zoomIn={zoomIn} zoomOut={zoomOut} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} setOpenHelpForm={setOpenHelpForm} />

      <div className={clsx("absolute top-4 z-[1000]", t("language").toLowerCase() === 'en' ? "right-[10px]" : "left-[10px]")}>
        <WebsiteTitleSec projectId={project.id} projectName={project.name} />

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

      <div className='w-screen h-[100vh]'>

        {/* <Image src='/assets/icons/test.svg' alt='' width={500} height={500} className='max-h-full max-w-full' /> */}
        {/* <Image src='/assets/images/project.jpg' alt='' width={2000} height={2000} className='min-h-screen max-h-full min-w-full' /> */}

        {/* <MapContainer
          center={[500, 500]} // مركز الخريطة
          zoom={1} // مستوى التكبير الابتدائي
          minZoom={1}
          maxZoom={2}
          scrollWheelZoom={true}
          style={{ height: '100vh', width: '100vw', maxHeight: '100vh', maxWidth: '100vw' }}
          crs={L.CRS.Simple} // استخدام نظام إحداثيات بسيط
          maxBounds={imageBounds} // تقييد السحب ضمن أبعاد الصورة
          maxBoundsViscosity={1.0}
        >
          <ImageOverlay className='w-screen h-screen transform' url={imageUrl} bounds={imageBounds} />

          {units.map((building) => (
            <Marker
              key={building.id}
              position={building.position}
              icon={L.divIcon({
                className: 'custom-icon',
                html: `<div style="background: rgba(255, 0, 0, 0.5); width: 62px; height: 183px; color: white; font-size: 25px; font-weight: bold;" class="flex items-center justify-center">${building.id}</div>`,
              })}
            >
              <Popup>
                <div>
                  <h3>{building.name}</h3>
                  <p>تفاصيل المبنى هنا...</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer> */}


        <MapContainer
          center={[500, 500]} 
          zoom={1}
          minZoom={1} 
          maxZoom={2}
          scrollWheelZoom={true}
          style={{ height: '100vh', width: '100%' }}
          crs={L.CRS.Simple}
          maxBounds={imageBounds}
          maxBoundsViscosity={1.0}
        >
          <ImageOverlay url={imageUrl} bounds={imageBounds} />
          {/* <FitBoundsToScreen /> */}
          <FitBoundsToImage bounds={imageBounds} />
          {units.map((building) => (
            <DynamicMarker key={building.id} building={building} />
          ))}
        </MapContainer>

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

