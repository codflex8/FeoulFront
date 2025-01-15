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

// bottom line 105 * 35 || translate3d(232px, 642px, 0px) rotate(7deg)

const page = ({ project, categories }: { project: Project, categories: string[] }) => {
  const t = useTranslations('ProjectPage');

  const imageUrl = '/assets/images/project.jpg';

  let imageBounds: L.LatLngBoundsExpression = [
    [0, 0],
    [450, 800],
  ];

  // const [imageBounds, setImageBounds] = useState<[number, number][]>([
  //   [0, 0],
  //   [450, 800],
  // ]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setImageBounds([
  //       [0, 0],
  //       [window.innerHeight-250, window.innerWidth-550],
  //     ]);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [isLargeerScreen, setIsLargeerScreen] = useState<boolean>(false);
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

  // if (isLargeerScreen) {
  //   imageBounds = [
  //     [0, 0],
  //     [450, 1300],
  //   ];
  // }
  // Function to check screen width
  const checkScreenWidth = () => {
    setIsLargeScreen(window.innerWidth > 768);
    setIsLargeerScreen(window.innerWidth > 1600);
  };

  useEffect(() => {
    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);

    };
  }, []);
  console.log("isLargeerScreen", isLargeerScreen);


  const units = [
    // bottom line 105 * 35 || translate3d(232px, 642px, 0px) rotate(7deg)
    {
      id: 151,
      name: 'Building 151',
      position: [130, 525],
      size: [70, 210],
    },
    {
      id: 510,
      name: 'Building 510',
      position: [130, 505],
      size: [70, 210],
    },
    {
      id: 149,
      name: 'Building 149',
      position: [130, 485],
      size: [70, 210],
    },
    {
      id: 148,
      name: 'Building 148',
      position: [130, 465],
      size: [70, 210],
    },
    {
      id: 147,
      name: 'Building 147',
      position: [130, 443],
      size: [70, 210],
    },
    {
      id: 146,
      name: 'Building 146',
      position: [130, 423],
      size: [70, 210],
    },
    {
      id: 145,
      name: 'Building 145',
      position: [130, 402],
      size: [70, 210],
    },
    {
      id: 144,
      name: 'Building 144',
      position: [130, 382],
      size: [70, 210],
    },
    {
      id: 143,
      name: 'Building 143',
      position: [130, 361],
      size: [70, 210],
    },
    {
      id: 142,
      name: 'Building 142',
      position: [130, 341],
      size: [70, 210],
    },
    {
      id: 141,
      name: 'Building 141',
      position: [130, 321],
      size: [70, 210],
    },
    {
      id: 140,
      name: 'Building 140',
      position: [130, 301],
      size: [70, 210],
    },
    {
      id: 139,
      name: 'Building 139',
      position: [130, 281],
      size: [70, 210],
    },
    {
      id: 138,
      name: 'Building 138',
      position: [130, 262],
      size: [70, 210],
    },
    {
      id: 137,
      name: 'Building 137',
      position: [130, 243],
      size: [70, 210],
    },
    {
      id: 136,
      name: 'Building 136',
      position: [130, 221],
      size: [70, 210],
    },
    {
      id: 135,
      name: 'Building 135',
      position: [130, 201],
      size: [70, 210],
    },
    {
      id: 134,
      name: 'Building 134',
      position: [130, 182],
      size: [74, 210],
    },
    {
      id: 133,
      name: 'Building 133',
      position: [130, 160],
      size: [72, 210],
    },
    {
      id: 132,
      name: 'Building 132',
      position: [130, 138],
      size: [70, 210],
    },
    {
      id: 131,
      name: 'Building 131',
      position: [130, 118],
      size: [70, 210],
    },
    {
      id: 130,
      name: 'Building 130',
      position: [130, 98],
      size: [70, 210],
    },
    {
      id: 129,
      name: 'Building 129',
      position: [130, 77],
      size: [68, 210],
    },
    {
      id: 128,
      name: 'Building 128',
      position: [130, 58],
      size: [65, 210],
    },

    // LEFT line-1
    {
      id: 116,
      name: 'Building 116',
      position: [242, 257],
      size: [78, 151],
    },
    {
      id: 115,
      name: 'Building 115',
      position: [242, 236],
      size: [72, 151],
    },
    {
      id: 114,
      name: 'Building 114',
      position: [242, 217],
      size: [55, 151],
    },
    {
      id: 113,
      name: 'Building 113',
      position: [242, 203],
      size: [52, 151],
    },
    {
      id: 112,
      name: 'Building 112',
      position: [242, 189],
      size: [58, 151],
    },
    {
      id: 111,
      name: 'Building 111',
      position: [242, 173],
      size: [60, 151],
    },
    {
      id: 110,
      name: 'Building 110',
      position: [242, 156],
      size: [56, 151],
    },
    {
      id: 109,
      name: 'Building 109',
      position: [242, 141],
      size: [52, 151],
    },
    {
      id: 108,
      name: 'Building 108',
      position: [242, 127],
      size: [58, 151],
    },
    {
      id: 107,
      name: 'Building 107',
      position: [242, 112],
      size: [60, 151],
    },

    // Left line-2
    {
      id: 117,
      name: 'Building 117',
      position: [202, 263],
      size: [78, 157],
    },
    {
      id: 118,
      name: 'Building 118',
      position: [202, 242],
      size: [72, 157],
    },
    {
      id: 119,
      name: 'Building 119',
      position: [202, 222],
      size: [60, 157],
    },
    {
      id: 120,
      name: 'Building 120',
      position: [202, 205],
      size: [48, 157],
    },
    {
      id: 121,
      name: 'Building 121',
      position: [202, 192],
      size: [58, 157],
    },
    {
      id: 122,
      name: 'Building 122',
      position: [202, 175],
      size: [60, 157],
    },
    {
      id: 123,
      name: 'Building 123',
      position: [202, 158],
      size: [60, 157],
    },
    {
      id: 124,
      name: 'Building 124',
      position: [202, 141],
      size: [50, 157],
    },
    {
      id: 125,
      name: 'Building 125',
      position: [202, 127],
      size: [58, 157],
    },
    {
      id: 126,
      name: 'Building 126',
      position: [202, 112],
      size: [60, 157],
    },
    {
      id: 127,
      name: 'Building 127',
      position: [202, 96],
      size: [60, 157],
    },

    // LEFT TOP
    {
      id: 106,
      name: 'Building 106',
      position: [292, 220],
      size: [78, 120],
    },
    {
      id: 105,
      name: 'Building 105',
      position: [292, 200],
      size: [50, 120],
    },
    {
      id: 104,
      name: 'Building 104',
      position: [292, 180],
      size: [55, 120],
    },
    {
      id: 103,
      name: 'Building 103',
      position: [292, 170],
      size: [52, 120],
    },
    {
      id: 102,
      name: 'Building 102',
      position: [292, 150],
      size: [58, 120],
    },
    {
      id: 101,
      name: 'Building 101',
      position: [242, 140],
      size: [60, 151],
    },
    {
      id: 100,
      name: 'Building 100',
      position: [242, 156],
      size: [56, 151],
    },
    {
      id: 99,
      name: 'Building 99',
      position: [242, 173],
      size: [60, 151],
    },
    {
      id: 98,
      name: 'Building 98',
      position: [242, 156],
      size: [56, 151],
    },
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
      html: `<div style="background: rgba(255, 0, 0, 0.3); width: ${iconSize[0]}px; height: ${iconSize[1]}px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; transition: all 0.3s ease">${building.id}</div>`,
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

