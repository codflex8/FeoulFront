"use client";

import React, { useState } from 'react'
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import ControlFunctions from '@/components/ControlFunctions';
import WebsiteTitleSec from '@/components/WebsiteTitleSec';
import BuildingBlocksFiters from '@/components/BuildingBlocksFiters';
import HelppingTools from '@/components/HelppingTools';

const page = (
  {
    // params
  }: {
    // params: Promise<{ projectId: string }>
  }) => {
  // const projectId = (await params).projectId;
  const t = useTranslations('ProjectPage');


  const [scale, setScale] = useState(1);

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

      <ControlFunctions zoomIn={zoomIn} zoomOut={zoomOut} />

      <div className={clsx("absolute top-4 z-[1000]", t("language").toLowerCase() === 'en' ? "right-[10px]" : "left-[10px]")}>
        <WebsiteTitleSec projectId="222" />

        <BuildingBlocksFiters />
      </div>
      <HelppingTools />
    </div>
  )
}

export default page
