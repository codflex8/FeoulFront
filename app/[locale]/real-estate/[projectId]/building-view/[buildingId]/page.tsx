'use client';

import BuildingPropertiesCard from "@/components/BuildingPropertiesCard";
import ControlFunctions from "@/components/ControlFunctions";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"


import clsx from 'clsx';

import WebsiteTitleSec from "@/components/WebsiteTitleSec";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import InterestedForm from "@/components/InterestedForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NeedHelpForm from "@/components/NeedHelpForm";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface floorsImagesProps {
  src: string;
  title: string;
}

const BuildingProperties = () => {
  const t = useTranslations('BuildingViewPage');
  return (
    <div className="p-4 grid grid-cols-3 gap-2 text-center">
      <div className="bg-gray-100 rounded-md p-1 shadow-sm">
        <span className="block text-xs text-gray-500">{t("BlockNumber")}</span>
        <span className="block text-sm font-bold text-gray-800">وحدة 60</span>
      </div>

      <div className="bg-gray-100 rounded-md p-1 shadow-sm">
        <span className="block text-xs text-gray-500">{t("Category")}</span>
        <span className="block text-sm font-bold text-gray-800">فئة A-1</span>
      </div>

      <div className="bg-gray-100 rounded-md p-1 shadow-sm">
        <span className="block text-xs text-gray-500">{t("Rooms")}</span>
        <span className="block text-sm font-bold text-gray-800">5</span>
      </div>

      <div className="bg-gray-100 rounded-md p-1 shadow-sm">
        <span className="block text-xs text-gray-500">{t("Bathrooms")}</span>
        <span className="block text-sm font-bold text-gray-800">7</span>
      </div>

      <div className="bg-gray-100 rounded-md p-1 shadow-sm">
        <span className="block text-xs text-gray-500">{t("TotalArea")}</span>
        <span className="block text-sm font-bold text-gray-800">5 {t("Meter")}</span>
      </div>

      <div className="bg-gray-100 rounded-md p-1 shadow-sm">
        <span className="block text-xs text-gray-500">{t("Price")}</span>
        <span className="font-bold gray-800">
          5 <span className="text-sm">{t("Riyal")}</span>
        </span>
      </div>
    </div>
  )
}

const page = () => {
  const t = useTranslations('BuildingViewPage');

  const [scale, setScale] = useState<number>(1);
  const [openInterestedForm, setOpenInterestedForm] = useState<boolean>(false);
  const [openBlockProperties, setOpenBlockProperties] = useState<boolean>(false);
  const [openHelpForm, setOpenHelpForm] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState<number>(0)
  const zoomStep = 0.1;

  const images = [
    {
      title: "المظهر الخارجي",
      src: "/assets/images/test.jpg",
    },
    {
      title: "المظهر الخارجي",
      src: "/assets/images/test.jpg",
    },
    {
      title: "المظهر الخارجي",
      src: "/assets/images/test.jpg",
    },
    {
      title: "المظهر الخارجي",
      src: "/assets/images/test.jpg",
    },
    {
      title: "المظهر الخارجي",
      src: "/assets/images/test.jpg",
    },
    {
      title: "المظهر الخارجي",
      src: "/assets/images/test.jpg",
    },
  ];

  const floorsImages: floorsImagesProps[] = [
    {
      src: "test.jpg",
      title: "Ground Floor"
    },
    {
      src: "test.jpg",
      title: "First Floor"
    },
    {
      src: "test.jpg",
      title: "Roof Floor"
    },
  ]

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

  const handleWheel = (event: WheelEvent) => {
    if (!carouselRef.current) return;
    const itemHeight = window.innerHeight;
    const delta = Math.sign(event.deltaY);
    const newIndex = selectedIndex + delta;

    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedIndex(newIndex);
      carouselRef.current.scrollTo({
        top: newIndex * itemHeight,
        behavior: 'smooth',
      });
    }

    // Prevent default scrolling
    event.preventDefault();
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollTop = carouselRef.current.scrollTop;
    const itemHeight = window.innerHeight;
    const index = Math.round(scrollTop / itemHeight);
    setSelectedIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const itemHeight = window.innerHeight;
    carouselRef.current.scrollTo({
      top: index * itemHeight,
      behavior: 'smooth',
    });
    setSelectedIndex(index);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    return () => carousel.removeEventListener('wheel', handleWheel);
  }, [selectedIndex]);

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="bg-[#4b5d6e75] relative text-center min-h-[100vh] w-screen flex items-center justify-center py-2 overflow-x-hidden">

      {/* Website Control Functions */}
      <ControlFunctions zoomIn={zoomIn} zoomOut={zoomOut} setPopupOpen={setPopupOpen} setOpenHelpForm={setOpenHelpForm} setOpenBlockProperties={setOpenBlockProperties} />

      {/* Website Title Section */}
      <div className={clsx("absolute top-4 z-[1000]", t("language").toLowerCase() === 'en' ? "right-[10px]" : "left-[10px]")}>
        <WebsiteTitleSec projectId="222" blockNumber={60} />
      </div>

      {/* Building Properities Block */}
      <div className={clsx("absolute top-24 z-[1000] hidden md:block", t("language").toLowerCase() === 'en' ? "right-[10px]" : "left-[10px]")}>
        <BuildingPropertiesCard
          type="فيلا الياسمين"
          status="متاح"
          category="نموذج A-1"
          rooms={5}
          bathrooms={4}
          buildingSpace={525.25}
          landSpace={600}
          price={1117427}
          open={openInterestedForm}
          setOpen={setOpenInterestedForm}
        />
      </div>

      {/* Floors Buttons */}
      <div className={clsx("absolute top-[65%] md:top-[55%] lg:top-24 z-[1000]", t("language").toLowerCase() === 'en' ? "right-[25px] md:right-[275px]" : "left-[25px] md:left-[275px]")}>
        <div className="p-2 rounded-md bg-slate-600 text-center h-fit flex flex-col">
          <h3 className="text-white text-xs font-semibold mb-1">{t("Floor")}</h3>
          <Button onClick={() => api?.scrollTo(0)} className={clsx("py-1 !h-fit md:py-2 px-1 md:px-3 rounded-none rounded-t-md text-white bg-gray-500 text-sm border-b border-slate-400 hover:bg-white hover:text-black transition-all", current === 0 ? "bg-white text-black" : "")}>{t("GroundFloor")}</Button>
          <Button onClick={() => api?.scrollTo(1)} className={clsx("py-1 !h-fit md:py-2 px-1 md:px-3 rounded-none text-white bg-gray-500 text-sm border-b border-slate-300 hover:bg-white hover:text-black transition-all", current === 1 ? "bg-white text-black" : "")}>{t("FirstFloor")}</Button>
          <Button onClick={() => api?.scrollTo(2)} className={clsx("py-1 !h-fit md:py-2 px-1 md:px-3 rounded-none rounded-b-md text-white bg-gray-500 text-sm hover:bg-white hover:text-black transition-all", current === 2 ? "bg-white text-black" : "")}>{t("SecondFloor")}</Button>
        </div>
      </div>

      {/* Building Floor Carousel */}
      <div className="mx-auto mt-auto md:m-auto relative">
        <Carousel orientation="vertical" opts={{ loop: true }} setApi={setApi} dir="rtl" className={`w-[300px] max-w-[90%] m-auto h-full transform transition-all scale-${scale} rounded-md`} style={{ transform: `scale(${scale})`, transition: "transform 0.3s ease-in-out" }}>
          <CarouselContent className="min-h-[400px] h-[70vh] md:h-[80vh] rounded-md max-w-[80%] m-auto">
            {floorsImages.map((img, key) => (
              <CarouselItem key={key + img.title}>
                <Image
                  src={`/assets/images/${img.src}`}
                  alt={img.title}
                  width={300}
                  height={1000}
                  className="h-full w-full rounded-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <Button className="bg-slate-600 hover:bg-slate-700 p-2 absolute top-[50%] transform translate-y-[-50%] -left-8 hidden sm:inline-flex" onClick={() => api?.scrollTo(current - 1)}>
            <Image
              src='/assets/icons/left-arrow.svg'
              alt="arrow"
              width={25}
              height={32}
            />
          </Button>
          <Button className="bg-slate-600 hover:bg-slate-700 p-2 absolute top-[50%] transform translate-y-[-50%] -right-8 hidden sm:inline-flex" onClick={() => api?.scrollTo(current + 1)}>
            <Image
              src='/assets/icons/left-arrow.svg'
              alt="arrow"
              width={25}
              height={32}
              className="transform rotate-180"
            />
          </Button>
        </Carousel>

        <div className="flex items-center justify-center gap-4 mt-4 md:mt-8">
          <Link href='/ar/real-estate/2555545'>
            <Button className="font-semibold">
              {t("MainStructureButton")}
            </Button>
          </Link>
          <Link href='/ar/vr-view'>
            <Button variant="outline" className="font-semibold">
              {t("VRButton")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Building Properities Block For Small Devices */}
      <Sheet open={openBlockProperties} onOpenChange={setOpenBlockProperties}>
        <SheetContent>
          <SheetHeader className="mb-4 !text-center">
            <SheetTitle >{t("BuildingProperties")}</SheetTitle>
          </SheetHeader>
          <BuildingPropertiesCard
            type="فيلا الياسمين"
            status="متاح"
            category="نموذج A-1"
            rooms={5}
            bathrooms={4}
            buildingSpace={525.25}
            landSpace={600}
            price={1117427}
            open={openInterestedForm}
            setOpen={setOpenInterestedForm}
          />
        </SheetContent>
      </Sheet>

      {/* Gallery Popup */}
      <Dialog open={isPopupOpen} onOpenChange={setPopupOpen}>
        <DialogContent dir="ltr" className="flex !h-full !w-screen rounded-none p-0 border-none" >
          {/* Left Sidebar */}
          <Sidebar>
            <SidebarContent dir="ltr" className="bg-gray-800 text-white min-w-[300px] max-w-[300px]">
              <SidebarGroup>
                <SidebarGroupContent>
                  <DialogTitle className="flex items-center justify-between">
                    <Button onClick={() => setPopupOpen(false)} className="m-6 p-0 w-fit h-fit">
                      <Image
                        src='/assets/icons/left-arrow.svg'
                        alt="Arrow"
                        width={40}
                        height={40}
                      />
                    </Button>
                    <SidebarGroupLabel className="text-white text-base font-semibold">{t("Gallery")}</SidebarGroupLabel>
                  </DialogTitle>

                  <div className="w-full mt-6 p-4 overflow-y-auto grid grid-cols-3 gap-4 place-content-start">
                    {images.map((img, index) => (
                      <div key={index} className="text-center text-sm">
                        <Image
                          width={40}
                          height={40}
                          src={img.src}
                          alt={`Image ${index + 1}`}
                          className={clsx(
                            "h-20 w-full mb-4 cursor-pointer rounded-md",
                            selectedIndex === index ? "border-4 border-blue-500" : "border"
                          )}
                          onClick={() => scrollToIndex(index)}
                        />
                        <h1>{img.title}</h1>
                      </div>
                    ))}
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Vertical Carousel */}
          <div
            ref={carouselRef}
            className="bg-gray-100 overflow-y-auto scrollbar-hidden relative md:w-[calc(100%-300px)] md:ml-auto"
            onScroll={handleScroll}
            style={{
              scrollSnapType: 'y mandatory',
            }}
          >
            <SidebarTrigger className="fixed top-4 left-4" />
            {images.map((img, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-screen border-b !w-full"
              >
                <Image
                  src={img.src}
                  alt={`Image ${index + 1}`}
                  width={1000}
                  height={1000}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Intrest Form Popup */}
      <Dialog open={openInterestedForm} onOpenChange={setOpenInterestedForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-xl font-extrabold">
              {t("AddInterest")}
            </DialogTitle>
          </DialogHeader>
          <BuildingProperties />
          <InterestedForm setOpen={setOpenInterestedForm} />
        </DialogContent>
      </Dialog>

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

    </div >
  )
}

export default page;
