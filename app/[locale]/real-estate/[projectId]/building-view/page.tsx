'use client';

import BuildingPropertiesCard from "@/components/BuildingPropertiesCard";
import ControlFunctions from "@/components/ControlFunctions";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import clsx from 'clsx';

import WebsiteTitleSec from "@/components/WebsiteTitleSec";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import InterestedForm from "@/components/InterestedForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


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
  const [scale, setScale] = useState(1);
  const [open, setOpen] = useState(false);
  const zoomStep = 0.2;

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  // const [count, setCount] = useState(0)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["places"])

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

  useEffect(() => {
    if (!api) {
      return
    }

    // setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: WheelEvent) => {
    if (!carouselRef.current) return;
    const itemHeight = window.innerHeight; // 100vh step
    const delta = Math.sign(event.deltaY); // Check if scrolling up or down
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

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    return () => carousel.removeEventListener('wheel', handleWheel);
  }, [selectedIndex]);

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

  const [isPopupOpen, setPopupOpen] = useState(false);

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

  console.log("Current", current);
  
  return (
    <div className="bg-[#544533] relative text-center min-h-[100vh] w-screen flex items-center justify-center py-4 overflow-x-hidden">

      <ControlFunctions selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} zoomIn={zoomIn} zoomOut={zoomOut} setPopupOpen={setPopupOpen} />

      <div className={clsx("absolute top-4 z-[1000]", t("language").toLowerCase() === 'en' ? "right-[10px]" : "left-[10px]")}>
        <WebsiteTitleSec />

        <div className="flex gap-2">
          <BuildingPropertiesCard
            type="فيلا"
            status="متاح"
            category="فئة A-1"
            rooms={5}
            bathrooms={4}
            buildingSpace={525.25}
            landSpace={600}
            price={1117427}
            open={open}
            setOpen={setOpen}
          />

          <div className="p-2 rounded-md bg-slate-600 text-center h-fit flex flex-col">
            <h3 className="text-white text-xs font-semibold mb-1">{t("Floor")}</h3>
            <Button onClick={() => api?.scrollTo(0)} className={clsx("py-2 px-3 rounded-none rounded-t-md text-white bg-gray-500 text-sm border-b border-slate-400 hover:bg-white hover:text-black transition-all", current === 0 ? "bg-white text-black" : "")}>{t("GroundFloor")}</Button>
            <Button onClick={() => api?.scrollTo(1)} className={clsx("py-2 px-3 rounded-none text-white bg-gray-500 text-sm border-b border-slate-300 hover:bg-white hover:text-black transition-all", current === 1 ? "bg-white text-black" : "")}>{t("FirstFloor")}</Button>
            <Button onClick={() => api?.scrollTo(2)} className={clsx("py-2 px-3 rounded-none rounded-b-md text-white bg-gray-500 text-sm hover:bg-white hover:text-black transition-all", current === 2 ? "bg-white text-black" : "")}>{t("SecondFloor")}</Button>
          </div>
        </div>
      </div>

      {/* Building Floor Carousel */}
      <div className="m-auto relative">
        <Carousel orientation="vertical" opts={{ loop: true }} setApi={setApi} dir="rtl" className={`w-[300px] m-auto h-full transform transition-all scale-${scale}`} style={{ transform: `scale(${scale})`, transition: "transform 0.3s ease-in-out" }}>
          <CarouselContent className="min-h-[500px] h-[80vh]">
            <CarouselItem>
              <Image
                src='/assets/images/test.jpg'
                alt="Type_A_GF"
                width={300}
                height={1000}
                className="min-h-[500px] h-[80vh]"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src='/assets/images/test.jpg'
                alt="Type_A_GF"
                width={300}
                height={1000}
                className="min-h-[500px] h-[80vh]"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src='/assets/images/test.jpg'
                alt="Type_A_RF"
                width={300}
                height={1000}
                className="min-h-[500px] h-[80vh]"
              />
            </CarouselItem>
          </CarouselContent>
          <Button className="bg-slate-600 hover:bg-slate-700 p-2 absolute top-[50%] transform translate-y-[-50%] left-[-50px]" onClick={() => api?.scrollTo(current - 1)}>
            <Image
              src='/assets/icons/left-arrow.svg'
              alt="arrow"
              width={25}
              height={32}
            />
          </Button>
          <Button className="bg-slate-600 hover:bg-slate-700 p-2 absolute top-[50%] transform translate-y-[-50%] right-[-50px]" onClick={() => api?.scrollTo(current + 1)}>
            <Image
              src='/assets/icons/left-arrow.svg'
              alt="arrow"
              width={25}
              height={32}
              className="transform rotate-180"
            />
          </Button>
        </Carousel>

        <div className="flex items-center justify-center gap-4 mt-8">
          <Link href='/ar/real-estate/2555545'>
            <Button>
              {t("MainStructureButton")}
            </Button>
          </Link>
          <Link href='/ar/vr-view'>
            <Button variant="outline">
              {t("VRButton")}
            </Button>
          </Link>
        </div>
      </div>



      {/* Gallery Popup */}
      <Dialog open={isPopupOpen} onOpenChange={setPopupOpen}>
        <DialogContent dir="ltr" className="flex !h-full !w-screen rounded-none p-0 border-none" style={{ width: "100vw", height: "100vh" }}>
          {/* Left Sidebar */}
          <div className="w-1/4 bg-gray-800 text-white">
            <DialogTitle>
              <Button onClick={() => setPopupOpen(false)} className="m-6 p-0 w-fit h-fit">
                <Image
                  src='/assets/icons/left-arrow.svg'
                  alt="Arrow"
                  width={40}
                  height={40}
                />
              </Button>
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
          </div>

          {/* Vertical Carousel */}
          <div
            ref={carouselRef}
            className="w-3/4 bg-gray-100 overflow-y-auto scrollbar-hidden"
            onScroll={handleScroll}
            style={{
              scrollSnapType: 'y mandatory',
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-screen border-b border-red-600"
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-xl font-extrabold">
              {t("AddInterest")}
            </DialogTitle>
          </DialogHeader>
          <BuildingProperties />
          <InterestedForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default page;
