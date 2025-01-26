"use client";

import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import ControlFunctions from "@/components/ControlFunctions";
import WebsiteTitleSec from "@/components/WebsiteTitleSec";
import BuildingBlocksFiters from "@/components/BuildingBlocksFiters";
import HelppingTools from "@/components/HelppingTools";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NeedHelpForm from "@/components/form/NeedHelpForm";
import {
  Categories,
  Project,
  Unit,
  UnitsData,
  UnitsFilters,
  UnitStatusEnum,
} from "@/types/map.types";

import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DynamicMarker from "./DynamicMarker";

interface BuildingProps {
  id: number;
  category: string;
  price: number;
  space: number;
}

// bottom line 105 * 35 || translate3d(232px, 642px, 0px) rotate(7deg)
const imageUrl = "/assets/images/project.jpg";

const page = ({
  project,
  categories,
  unitsData,
}: {
  project: Project;
  unitsData: UnitsData;
  categories: string[];
}) => {
  const t = useTranslations("ProjectPage");

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
  const [unitsFilters, setUnitsFilters] = useState<UnitsFilters>({
    unitStatus: UnitStatusEnum.available,
    unitsPriceRange: {
      ...unitsData.unitsPriceRange,
      sliderValue: [
        unitsData.unitsPriceRange.minPrice,
        unitsData.unitsPriceRange.maxPrice,
      ],
    },
    unitsSpaceRange: {
      ...unitsData.unitsSpaceRange,
      sliderValue: [
        unitsData.unitsSpaceRange.minSpace,
        unitsData.unitsSpaceRange.maxSpace,
      ],
    },
    selectedCategory: "All",
  });

  const getRenderedUnits = () => {
    let units = unitsData.avaliableUnits;
    const filteredStatus = unitsFilters.unitStatus;
    const filteredPriceRange = unitsFilters.unitsPriceRange;
    const filteredSpaceRange = unitsFilters.unitsSpaceRange;
    const selectedCategory = unitsFilters.selectedCategory;
    if (filteredStatus === "reserved") {
      units = unitsData.reverseUnits;
    } else if (filteredStatus === "saled") {
      units = unitsData.saledUnits;
    }

    if (selectedCategory !== "All") {
      units = units.filter((unit) => unit.category.name === selectedCategory);
    }

    const minPrice = filteredPriceRange.sliderValue[0];
    const maxPrice = filteredPriceRange.sliderValue[1];
    const minSpace = filteredSpaceRange.sliderValue[0];
    const maxSpace = filteredSpaceRange.sliderValue[1];

    units = units.filter(
      (unit) => unit.price >= minPrice && unit.price <= maxPrice
    );

    units = units.filter(
      (unit) => unit.buildSpace >= minSpace && unit.buildSpace <= maxSpace
    );

    return units;
  };

  const renderedUnits = getRenderedUnits();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [isLargeerScreen, setIsLargeerScreen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [openHelpForm, setOpenHelpForm] = useState<boolean>(false);

  const zoomStep = 0.2;

  const zoomIn = () => {
    if (scale <= 1) {
      setScale((prev) => prev + zoomStep);
    }
  };
  const zoomOut = () => {
    if (scale <= 2 && scale >= 0.6) {
      setScale((prev) => (prev > zoomStep ? prev - zoomStep : prev));
    }
  };

  const handleShowBuildigsFilters = () => {
    setShowFilters((prev) => !prev);
  };

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

  const FitBoundsToImage = ({
    bounds,
  }: {
    bounds: L.LatLngBoundsExpression;
  }) => {
    const map = useMap();

    React.useEffect(() => {
      map.fitBounds(bounds, { padding: [20, 20] }); // إضافة حواف بسيطة
    }, [map, bounds]);

    return null;
  };

  return (
    <div className="bg-[#544533] relative text-center min-h-[100vh] w-screen flex items-center justify-center overflow-x-hidden">
      <ControlFunctions
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        setOpenHelpForm={setOpenHelpForm}
      />

      <div
        className={clsx(
          "absolute top-4 z-[1000]",
          t("language").toLowerCase() === "en" ? "right-[10px]" : "left-[10px]"
        )}
      >
        <WebsiteTitleSec projectId={project.id} projectName={project.name} />

        <div className="w-fit">
          <Button
            className="md:hidden w-full !bg-slate-600 text-white !justify-between"
            onClick={handleShowBuildigsFilters}
          >
            <span>فلاتر</span>
            <Image
              src="/assets/icons/left-arrow.svg"
              alt="arrow"
              width={32}
              height={32}
              className={clsx(
                "transition-all",
                showFilters ? "rotate-90" : "-rotate-90"
              )}
            />
          </Button>

          {/* Filters block */}

          <BuildingBlocksFiters
            className={
              showFilters || isLargeScreen ? "max-h-[800] py-2" : "max-h-0"
            }
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            unitsFilters={unitsFilters}
            setUnitsFilters={setUnitsFilters}
            unitsCount={renderedUnits.length}
          />
        </div>
      </div>
      <HelppingTools />

      <div className="w-screen h-[100vh]">
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
          style={{ height: "100vh", width: "100%" }}
          crs={L.CRS.Simple}
          maxBounds={imageBounds}
          maxBoundsViscosity={1.0}
        >
          <ImageOverlay url={imageUrl} bounds={imageBounds} />
          {/* <FitBoundsToScreen /> */}
          <FitBoundsToImage bounds={imageBounds} />
          {renderedUnits.map((unit) => (
            <DynamicMarker key={unit.id} unit={unit} />
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
  );
};

export default page;
