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
    {
      id: 151,
      name: 'Building 151',
      position: [130, 525],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 150,
      name: 'Building 150',
      position: [130, 505],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 149,
      name: 'Building 149',
      position: [130, 485],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 148,
      name: 'Building 148',
      position: [130, 465],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 147,
      name: 'Building 147',
      position: [130, 443],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 146,
      name: 'Building 146',
      position: [130, 423],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 145,
      name: 'Building 145',
      position: [130, 402],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 144,
      name: 'Building 144',
      position: [130, 382],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 143,
      name: 'Building 143',
      position: [130, 361],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 142,
      name: 'Building 142',
      position: [130, 341],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 141,
      name: 'Building 141',
      position: [130, 321],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 140,
      name: 'Building 140',
      position: [130, 301],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 139,
      name: 'Building 139',
      position: [130, 281],
      size: [70, 210],
      category: 'class-A'
    },
    {
      id: 138,
      name: 'Building 138',
      position: [130, 262],
      size: [70, 210],
      category: 'class-B'
    },
    {
      id: 137,
      name: 'Building 137',
      position: [130, 243],
      size: [70, 210],
      category: 'class-B'
    },
    {
      id: 136,
      name: 'Building 136',
      position: [130, 221],
      size: [70, 210],
      category: 'class-B'
    },
    {
      id: 135,
      name: 'Building 135',
      position: [130, 201],
      size: [70, 210],
      category: 'class-B'
    },
    {
      id: 134,
      name: 'Building 134',
      position: [130, 182],
      size: [74, 210],
      category: 'class-B'
    },
    {
      id: 133,
      name: 'Building 133',
      position: [130, 160],
      size: [72, 210],
      category: 'class-B'
    },
    {
      id: 132,
      name: 'Building 132',
      position: [130, 138],
      size: [70, 210],
      category: 'class-B'
    },
    {
      id: 131,
      name: 'Building 131',
      position: [130, 118],
      size: [70, 210],
      category: 'class-B'
    },
    {
      id: 130,
      name: 'Building 130',
      position: [130, 98],
      size: [70, 210],
      category: 'class-B'
    },
    {
      id: 129,
      name: 'Building 129',
      position: [130, 77],
      size: [68, 210],
      category: 'class-B'
    },
    {
      id: 128,
      name: 'Building 128',
      position: [130, 58],
      size: [65, 210],
      category: 'class-B'
    },

    // LEFT line-1
    {
      id: 116,
      name: 'Building 116',
      position: [242, 257],
      size: [78, 151],
      category: 'class-C'
    },
    {
      id: 115,
      name: 'Building 115',
      position: [242, 236],
      size: [72, 151],
      category: 'class-C'
    },
    {
      id: 114,
      name: 'Building 114',
      position: [242, 217],
      size: [55, 151],
      category: 'class-C'
    },
    {
      id: 113,
      name: 'Building 113',
      position: [242, 203],
      size: [52, 151],
      category: 'class-C'
    },
    {
      id: 112,
      name: 'Building 112',
      position: [242, 189],
      size: [58, 151],
      category: 'class-C'
    },
    {
      id: 111,
      name: 'Building 111',
      position: [242, 173],
      size: [60, 151],
      category: 'class-A'
    },
    {
      id: 110,
      name: 'Building 110',
      position: [242, 156],
      size: [56, 151],
      category: 'class-A'
    },
    {
      id: 109,
      name: 'Building 109',
      position: [242, 141],
      size: [52, 151],
      category: 'class-D'
    },
    {
      id: 108,
      name: 'Building 108',
      position: [242, 127],
      size: [58, 151],
      category: 'class-D'
    },
    {
      id: 107,
      name: 'Building 107',
      position: [242, 112],
      size: [60, 151],
      category: 'class-D'
    },

    // Left line-2
    {
      id: 117,
      name: 'Building 117',
      position: [202, 263],
      size: [78, 157],
      category: 'class-D'
    },
    {
      id: 118,
      name: 'Building 118',
      position: [202, 242],
      size: [72, 157],
      category: 'class-A'
    },
    {
      id: 119,
      name: 'Building 119',
      position: [202, 222],
      size: [60, 157],
      category: 'class-A'
    },
    {
      id: 120,
      name: 'Building 120',
      position: [202, 205],
      size: [48, 157],
      category: 'class-A'
    },
    {
      id: 121,
      name: 'Building 121',
      position: [202, 192],
      size: [58, 157],
      category: 'class-A'
    },
    {
      id: 122,
      name: 'Building 122',
      position: [202, 175],
      size: [60, 157],
      category: 'class-A'
    },
    {
      id: 123,
      name: 'Building 123',
      position: [202, 158],
      size: [60, 157],
      category: 'class-A'
    },
    {
      id: 124,
      name: 'Building 124',
      position: [202, 141],
      size: [50, 157],
      category: 'class-A'
    },
    {
      id: 125,
      name: 'Building 125',
      position: [202, 127],
      size: [58, 157],
      category: 'class-A'
    },
    {
      id: 126,
      name: 'Building 126',
      position: [202, 112],
      size: [60, 157],
      category: 'class-A'
    },
    {
      id: 127,
      name: 'Building 127',
      position: [202, 96],
      size: [60, 157],
      category: 'class-A'
    },

    // LEFT TOP
    {
      id: 106,
      name: 'Building 106',
      position: [294, 220],
      size: [78, 120],
      category: 'class-A'
    },
    {
      id: 105,
      name: 'Building 105',
      position: [294, 200],
      size: [64, 120],
      category: 'class-A'
    },
    {
      id: 104,
      name: 'Building 104',
      position: [294, 183],
      size: [48, 120],
      category: 'class-A'
    },
    {
      id: 103,
      name: 'Building 103',
      position: [294, 170],
      size: [48, 120],
      category: 'class-A'
    },
    {
      id: 102,
      name: 'Building 102',
      position: [294, 157],
      size: [52, 120],
      category: 'class-A'
    },
    {
      id: 101,
      name: 'Building 101',
      position: [294, 143],
      size: [54, 120],
      category: 'class-A'
    },

    {
      id: 100,
      name: 'Building 100',
      position: [322, 185],
      size: [58, 110],
      category: 'class-A'
    },
    {
      id: 99,
      name: 'Building 99',
      position: [322, 170],
      size: [58, 110],
      category: 'class-A'
    },
    {
      id: 98,
      name: 'Building 98',
      position: [322, 155],
      size: [58, 110],
      category: 'class-A'
    },

    // Right Section
    {
      id: 1,
      name: 'Building 1',
      position: [112, 628],
      size: [220, 100],
      category: 'class-A'
    },
    {
      id: 2,
      name: 'Building 2',
      position: [135, 625],
      size: [220, 88],
      category: 'class-B'
    },
    {
      id: 3,
      name: 'Building 3',
      position: [155, 618],
      size: [218, 74],
      category: 'class-B'
    },
    {
      id: 4,
      name: 'Building 4',
      position: [175, 614],
      size: [215, 74],
      category: 'class-B'
    },
    {
      id: 5,
      name: 'Building 5',
      position: [194, 610],
      size: [212, 72],
      category: 'class-B'
    },
    {
      id: 6,
      name: 'Building 6',
      position: [210, 603],
      size: [208, 67],
      category: 'class-B'
    },
    {
      id: 7,
      name: 'Building 7',
      position: [226, 595],
      size: [205, 65],
      category: 'class-B'
    },
    {
      id: 8,
      name: 'Building 8',
      position: [241, 590],
      size: [200, 58],
      category: 'class-B'
    },
    {
      id: 9,
      name: 'Building 9',
      position: [256, 583],
      size: [200, 58],
      category: 'class-B'
    },
    {
      id: 10,
      name: 'Building 10',
      position: [269, 575],
      size: [200, 52],
      category: 'class-B'
    },
    {
      id: 11,
      name: 'Building 11',
      position: [282, 570],
      size: [195, 50],
      category: 'class-B'
    },

    {
      id: 12,
      name: 'Building 12',
      position: [300, 550],
      size: [170, 68],
      category: 'class-A'
    },
    {
      id: 13,
      name: 'Building 13',
      position: [315, 540],
      size: [168, 60],
      category: 'class-B'
    },
    {
      id: 14,
      name: 'Building 14',
      position: [325, 528],
      size: [160, 50],
      category: 'class-B'
    },
    {
      id: 15,
      name: 'Building 15',
      position: [332, 516],
      size: [150, 48],
      category: 'class-B'
    },
    {
      id: 16,
      name: 'Building 16',
      position: [343, 510],
      size: [150, 47],
      category: 'class-B'
    },
    {
      id: 17,
      name: 'Building 17',
      position: [352, 500],
      size: [150, 45],
      category: 'class-B'
    },
    {
      id: 18,
      name: 'Building 18',
      position: [359, 487],
      size: [135, 40],
      category: 'class-B'
    },
    {
      id: 19,
      name: 'Building 19',
      position: [368, 480],
      size: [135, 40],
      category: 'class-B'
    },
    {
      id: 20,
      name: 'Building 20',
      position: [375, 470],
      size: [135, 40],
      category: 'class-B'
    },
    {
      id: 21,
      name: 'Building 21',
      position: [379, 457],
      size: [120, 40],
      category: 'class-B'
    },
    {
      id: 22,
      name: 'Building 22',
      position: [387, 450],
      size: [120, 40],
      category: 'class-B'
    },
    {
      id: 23,
      name: 'Building 23',
      position: [394, 442],
      size: [120, 40],
      category: 'class-B'
    },
    {
      id: 24,
      name: 'Building 24',
      position: [398, 433],
      size: [120, 38],
      category: 'class-B'
    },
    {
      id: 25,
      name: 'Building 25',
      position: [405, 425],
      size: [120, 35],
      category: 'class-B'
    },
    {
      id: 26,
      name: 'Building 26',
      position: [411, 415],
      size: [120, 35],
      category: 'class-B'
    },
    {
      id: 27,
      name: 'Building 27',
      position: [417, 410],
      size: [125, 38],
      category: 'class-B'
    },

    // Middle
    {
      id: 28,
      name: 'Building 28',
      position: [393, 370],
      size: [120, 40],
      category: 'class-B'
    },
    {
      id: 29,
      name: 'Building 29',
      position: [385, 377],
      size: [120, 40],
      category: 'class-B'
    },
    {
      id: 30,
      name: 'Building 30',
      position: [381, 385],
      size: [120, 40],
      category: 'class-B'
    },
    {
      id: 31,
      name: 'Building 31',
      position: [374, 392],
      size: [125, 40],
      category: 'class-B'
    },
    {
      id: 32,
      name: 'Building 32',
      position: [368, 400],
      size: [130, 40],
      category: 'class-B'
    },
    {
      id: 33,
      name: 'Building 33',
      position: [362, 410],
      size: [130, 38],
      category: 'class-B'
    },
    {
      id: 34,
      name: 'Building 34',
      position: [356, 420],
      size: [130, 42],
      category: 'class-B'
    },
    {
      id: 35,
      name: 'Building 35',
      position: [349, 430],
      size: [130, 45],
      category: 'class-B'
    },
    {
      id: 36,
      name: 'Building 36',
      position: [341, 440],
      size: [130, 45],
      category: 'class-B'
    },
    {
      id: 37,
      name: 'Building 37',
      position: [332, 448],
      size: [130, 47],
      category: 'class-B'
    },
    {
      id: 38,
      name: 'Building 38',
      position: [322, 457],
      size: [130, 47],
      category: 'class-B'
    },
    {
      id: 39,
      name: 'Building 39',
      position: [312, 465],
      size: [130, 56],
      category: 'class-B'
    },
    {
      id: 40,
      name: 'Building 40',
      position: [302, 475],
      size: [130, 60],
      category: 'class-B'
    },
    {
      id: 41,
      name: 'Building 41',
      position: [288, 485],
      size: [150, 47],
      category: 'class-B'
    },
    {
      id: 42,
      name: 'Building 42',
      position: [277, 490],
      size: [150, 52],
      category: 'class-B'
    },
    {
      id: 43,
      name: 'Building 43',
      position: [265, 500],
      size: [150, 52],
      category: 'class-B'
    },
    {
      id: 44,
      name: 'Building 44',
      position: [252, 505],
      size: [157, 52],
      category: 'class-B'
    },
    {
      id: 45,
      name: 'Building 45',
      position: [240, 510],
      size: [160, 57],
      category: 'class-B'
    },
    {
      id: 46,
      name: 'Building 46',
      position: [225, 516],
      size: [175, 62],
      category: 'class-B'
    },
    {
      id: 47,
      name: 'Building 47',
      position: [210, 522],
      size: [180, 75],
      category: 'class-B'
    },
    {
      id: 48,
      name: 'Building 48',
      position: [191, 525],
      size: [185, 79],
      category: 'class-B'
    },
    {
      id: 49,
      name: 'Building 49',
      position: [191, 480],
      size: [182, 79],
      category: 'class-B'
    },
    {
      id: 50,
      name: 'Building 50',
      position: [210, 477],
      size: [180, 77],
      category: 'class-B'
    },
    {
      id: 51,
      name: 'Building 51',
      position: [225, 470],
      size: [175, 65],
      category: 'class-B'
    },
    {
      id: 52,
      name: 'Building 52',
      position: [242, 467],
      size: [170, 65],
      category: 'class-B'
    },
    {
      id: 53,
      name: 'Building 53',
      position: [256, 460],
      size: [158, 57],
      category: 'class-B'
    },
    {
      id: 54,
      name: 'Building 54',
      position: [270, 458],
      size: [145, 55],
      category: 'class-B'
    },
    {
      id: 55,
      name: 'Building 55',
      position: [282, 448],
      size: [135, 50],
      category: 'class-B'
    },
    {
      id: 56,
      name: 'Building 56',
      position: [294, 435],
      size: [125, 45],
      category: 'class-B'
    },
    {
      id: 57,
      name: 'Building 57',
      position: [303, 425],
      size: [125, 45],
      category: 'class-B'
    },
    {
      id: 58,
      name: 'Building 58',
      position: [314, 420],
      size: [125, 45],
      category: 'class-B'
    },
    {
      id: 58,
      name: 'Building 58',
      position: [324, 410],
      size: [120, 45],
      category: 'class-B'
    },
    {
      id: 59,
      name: 'Building 59',
      position: [335, 400],
      size: [110, 45],
      category: 'class-B'
    },
    {
      id: 60,
      name: 'Building 60',
      position: [341, 390],
      size: [110, 42],
      category: 'class-B'
    },
    {
      id: 61,
      name: 'Building 61',
      position: [348, 380],
      size: [110, 42],
      category: 'class-B'
    },
    {
      id: 62,
      name: 'Building 62',
      position: [354, 370],
      size: [110, 42],
      category: 'class-B'
    },
    {
      id: 63,
      name: 'Building 63',
      position: [360, 360],
      size: [110, 42],
      category: 'class-B'
    },
    {
      id: 64,
      name: 'Building 64',
      position: [365, 354],
      size: [110, 35],
      category: 'class-B'
    },
    {
      id: 66,
      name: 'Building 66',
      position: [372, 350],
      size: [110, 35],
      category: 'class-B'
    },
    {
      id: 67,
      name: 'Building 67',
      position: [376, 342],
      size: [110, 35],
      category: 'class-B'
    },


    // Middle Left
    {
      id: 83,
      name: 'Building 83',
      position: [191, 402],
      size: [175, 79],
      category: 'class-B'
    },
    {
      id: 82,
      name: 'Building 82',
      position: [208, 402],
      size: [180, 65],
      category: 'class-B'
    },
    {
      id: 81,
      name: 'Building 81',
      position: [220, 400],
      size: [175, 50],
      category: 'class-B'
    },
    {
      id: 80,
      name: 'Building 80',
      position: [233, 397],
      size: [170, 55],
      category: 'class-B'
    },
    {
      id: 79,
      name: 'Building 79',
      position: [248, 390],
      size: [158, 57],
      category: 'class-B'
    },
    {
      id: 78,
      name: 'Building 78',
      position: [263, 385],
      size: [145, 55],
      category: 'class-B'
    },
    {
      id: 77,
      name: 'Building 77',
      position: [275, 380],
      size: [142, 48],
      category: 'class-B'
    },
    {
      id: 76,
      name: 'Building 76',
      position: [288, 370],
      size: [142, 52],
      category: 'class-B'
    },
    {
      id: 75,
      name: 'Building 75',
      position: [300, 360],
      size: [142, 49],
      category: 'class-B'
    },
    {
      id: 74,
      name: 'Building 74',
      position: [309, 350],
      size: [142, 49],
      category: 'class-B'
    },
    {
      id: 73,
      name: 'Building 73',
      position: [317, 340],
      size: [142, 45],
      category: 'class-B'
    },
    {
      id: 72,
      name: 'Building 72',
      position: [325, 330],
      size: [142, 45],
      category: 'class-B'
    },
    {
      id: 71,
      name: 'Building 71',
      position: [331, 320],
      size: [135, 40],
      category: 'class-B'
    },
    {
      id: 70,
      name: 'Building 70',
      position: [337, 312],
      size: [135, 40],
      category: 'class-B'
    },
    {
      id: 69,
      name: 'Building 69',
      position: [343, 305],
      size: [135, 40],
      category: 'class-B'
    },
    {
      id: 68,
      name: 'Building 68',
      position: [350, 297],
      size: [135, 40],
      category: 'class-B'
    },


    // Middle Left Left
    {
      id: 84,
      name: 'Building 84',
      position: [191, 357],
      size: [175, 79],
      category: 'class-B'
    },
    {
      id: 85,
      name: 'Building 85',
      position: [209, 358],
      size: [176, 68],
      category: 'class-B'
    },
    {
      id: 86,
      name: 'Building 86',
      position: [225, 356],
      size: [175, 60],
      category: 'class-B'
    },
    {
      id: 87,
      name: 'Building 87',
      position: [241, 356],
      size: [175, 60],
      category: 'class-B'
    },
    {
      id: 88,
      name: 'Building 88',
      position: [255, 350],
      size: [175, 58],
      category: 'class-B'
    },
    {
      id: 89,
      name: 'Building 89',
      position: [269, 340],
      size: [150, 55],
      category: 'class-B'
    },
    {
      id: 90,
      name: 'Building 90',
      position: [280, 325],
      size: [140, 45],
      category: 'class-B'
    },
    {
      id: 91,
      name: 'Building 91',
      position: [290, 320],
      size: [140, 45],
      category: 'class-B'
    },
    {
      id: 92,
      name: 'Building 92',
      position: [298, 310],
      size: [130, 45],
      category: 'class-B'
    },
    {
      id: 93,
      name: 'Building 93',
      position: [305, 300],
      size: [140, 45],
      category: 'class-B'
    },
    {
      id: 94,
      name: 'Building 94',
      position: [313, 290],
      size: [140, 45],
      category: 'class-B'
    },
    {
      id: 95,
      name: 'Building 95',
      position: [321, 283],
      size: [130, 45],
      category: 'class-B'
    },
    {
      id: 96,
      name: 'Building 96',
      position: [328, 275],
      size: [130, 40],
      category: 'class-B'
    },
    {
      id: 97,
      name: 'Building 97',
      position: [335, 270],
      size: [130, 40],
      category: 'class-B'
    },

  ];


  const unitsData = [
    {
      id: 1,
      name: "Building 1",
      position: [
        112,
        628
      ],
      size: [
        220,
        100
      ],
      category: "class-A"
    },
    {
      id: 2,
      name: "Building 2",
      position: [
        135,
        625
      ],
      size: [
        220,
        88
      ],
      category: "class-B"
    },
    {
      id: 3,
      name: "Building 3",
      position: [
        155,
        618
      ],
      size: [
        218,
        74
      ],
      category: "class-B"
    },
    {
      id: 4,
      name: "Building 4",
      position: [
        175,
        614
      ],
      size: [
        215,
        74
      ],
      category: "class-B"
    },
    {
      id: 5,
      name: "Building 5",
      position: [
        194,
        610
      ],
      size: [
        212,
        72
      ],
      category: "class-B"
    },
    {
      id: 6,
      name: "Building 6",
      position: [
        210,
        603
      ],
      size: [
        208,
        67
      ],
      category: "class-B"
    },
    {
      id: 7,
      name: "Building 7",
      position: [
        226,
        595
      ],
      size: [
        205,
        65
      ],
      category: "class-B"
    },
    {
      id: 8,
      name: "Building 8",
      position: [
        241,
        590
      ],
      size: [
        200,
        58
      ],
      category: "class-B"
    },
    {
      id: 9,
      name: "Building 9",
      position: [
        256,
        583
      ],
      size: [
        200,
        58
      ],
      category: "class-B"
    },
    {
      id: 10,
      name: "Building 10",
      position: [
        269,
        575
      ],
      size: [
        200,
        52
      ],
      category: "class-B"
    },
    {
      id: 11,
      name: "Building 11",
      position: [
        282,
        570
      ],
      size: [
        195,
        50
      ],
      category: "class-B"
    },
    {
      id: 12,
      name: "Building 12",
      position: [
        300,
        550
      ],
      size: [
        170,
        68
      ],
      category: "class-A"
    },
    {
      id: 13,
      name: "Building 13",
      position: [
        315,
        540
      ],
      size: [
        168,
        60
      ],
      category: "class-B"
    },
    {
      id: 14,
      name: "Building 14",
      position: [
        325,
        528
      ],
      size: [
        160,
        50
      ],
      category: "class-B"
    },
    {
      id: 15,
      name: "Building 15",
      position: [
        332,
        516
      ],
      size: [
        150,
        48
      ],
      category: "class-B"
    },
    {
      id: 16,
      name: "Building 16",
      position: [
        343,
        510
      ],
      size: [
        150,
        47
      ],
      category: "class-B"
    },
    {
      id: 17,
      name: "Building 17",
      position: [
        352,
        500
      ],
      size: [
        150,
        45
      ],
      category: "class-B"
    },
    {
      id: 18,
      name: "Building 18",
      position: [
        359,
        487
      ],
      size: [
        135,
        40
      ],
      category: "class-B"
    },
    {
      id: 19,
      name: "Building 19",
      position: [
        368,
        480
      ],
      size: [
        135,
        40
      ],
      category: "class-B"
    },
    {
      id: 20,
      name: "Building 20",
      position: [
        375,
        470
      ],
      size: [
        135,
        40
      ],
      category: "class-B"
    },
    {
      id: 21,
      name: "Building 21",
      position: [
        379,
        457
      ],
      size: [
        120,
        40
      ],
      category: "class-B"
    },
    {
      id: 22,
      name: "Building 22",
      position: [
        387,
        450
      ],
      size: [
        120,
        40
      ],
      category: "class-B"
    },
    {
      id: 23,
      name: "Building 23",
      position: [
        394,
        442
      ],
      size: [
        120,
        40
      ],
      category: "class-B"
    },
    {
      id: 24,
      name: "Building 24",
      position: [
        398,
        433
      ],
      size: [
        120,
        38
      ],
      category: "class-B"
    },
    {
      id: 25,
      name: "Building 25",
      position: [
        405,
        425
      ],
      size: [
        120,
        35
      ],
      category: "class-B"
    },
    {
      id: 26,
      name: "Building 26",
      position: [
        411,
        415
      ],
      size: [
        120,
        35
      ],
      category: "class-B"
    },
    {
      id: 27,
      name: "Building 27",
      position: [
        417,
        410
      ],
      size: [
        125,
        38
      ],
      category: "class-B"
    },
    {
      id: 28,
      name: "Building 28",
      position: [
        393,
        370
      ],
      size: [
        120,
        40
      ],
      category: "class-B"
    },
    {
      id: 29,
      name: "Building 29",
      position: [
        385,
        377
      ],
      size: [
        120,
        40
      ],
      category: "class-B"
    },
    {
      id: 30,
      name: "Building 30",
      position: [
        381,
        385
      ],
      size: [
        120,
        40
      ],
      category: "class-B"
    },
    {
      id: 31,
      name: "Building 31",
      position: [
        374,
        392
      ],
      size: [
        125,
        40
      ],
      category: "class-B"
    },
    {
      id: 32,
      name: "Building 32",
      position: [
        368,
        400
      ],
      size: [
        130,
        40
      ],
      category: "class-B"
    },
    {
      id: 33,
      name: "Building 33",
      position: [
        362,
        410
      ],
      size: [
        130,
        38
      ],
      category: "class-B"
    },
    {
      id: 34,
      name: "Building 34",
      position: [
        356,
        420
      ],
      size: [
        130,
        42
      ],
      category: "class-B"
    },
    {
      id: 35,
      name: "Building 35",
      position: [
        349,
        430
      ],
      size: [
        130,
        45
      ],
      category: "class-B"
    },
    {
      id: 36,
      name: "Building 36",
      position: [
        341,
        440
      ],
      size: [
        130,
        45
      ],
      category: "class-B"
    },
    {
      id: 37,
      name: "Building 37",
      position: [
        332,
        448
      ],
      size: [
        130,
        47
      ],
      category: "class-B"
    },
    {
      id: 38,
      name: "Building 38",
      position: [
        322,
        457
      ],
      size: [
        130,
        47
      ],
      category: "class-B"
    },
    {
      id: 39,
      name: "Building 39",
      position: [
        312,
        465
      ],
      size: [
        130,
        56
      ],
      category: "class-B"
    },
    {
      id: 40,
      name: "Building 40",
      position: [
        302,
        475
      ],
      size: [
        130,
        60
      ],
      category: "class-B"
    },
    {
      id: 41,
      name: "Building 41",
      position: [
        288,
        485
      ],
      size: [
        150,
        47
      ],
      category: "class-B"
    },
    {
      id: 42,
      name: "Building 42",
      position: [
        277,
        490
      ],
      size: [
        150,
        52
      ],
      category: "class-B"
    },
    {
      id: 43,
      name: "Building 43",
      position: [
        265,
        500
      ],
      size: [
        150,
        52
      ],
      category: "class-B"
    },
    {
      id: 44,
      name: "Building 44",
      position: [
        252,
        505
      ],
      size: [
        157,
        52
      ],
      category: "class-B"
    },
    {
      id: 45,
      name: "Building 45",
      position: [
        240,
        510
      ],
      size: [
        160,
        57
      ],
      category: "class-B"
    },
    {
      id: 46,
      name: "Building 46",
      position: [
        225,
        516
      ],
      size: [
        175,
        62
      ],
      category: "class-B"
    },
    {
      id: 47,
      name: "Building 47",
      position: [
        210,
        522
      ],
      size: [
        180,
        75
      ],
      category: "class-B"
    },
    {
      id: 48,
      name: "Building 48",
      position: [
        191,
        525
      ],
      size: [
        185,
        79
      ],
      category: "class-B"
    },
    {
      id: 49,
      name: "Building 49",
      position: [
        191,
        480
      ],
      size: [
        182,
        79
      ],
      category: "class-B"
    },
    {
      id: 50,
      name: "Building 50",
      position: [
        210,
        477
      ],
      size: [
        180,
        77
      ],
      category: "class-B"
    },
    {
      id: 51,
      name: "Building 51",
      position: [
        225,
        470
      ],
      size: [
        175,
        65
      ],
      category: "class-B"
    },
    {
      id: 52,
      name: "Building 52",
      position: [
        242,
        467
      ],
      size: [
        170,
        65
      ],
      category: "class-B"
    },
    {
      id: 53,
      name: "Building 53",
      position: [
        256,
        460
      ],
      size: [
        158,
        57
      ],
      category: "class-B"
    },
    {
      id: 54,
      name: "Building 54",
      position: [
        270,
        458
      ],
      size: [
        145,
        55
      ],
      category: "class-B"
    },
    {
      id: 55,
      name: "Building 55",
      position: [
        282,
        448
      ],
      size: [
        135,
        50
      ],
      category: "class-B"
    },
    {
      id: 56,
      name: "Building 56",
      position: [
        294,
        435
      ],
      size: [
        125,
        45
      ],
      category: "class-B"
    },
    {
      id: 57,
      name: "Building 57",
      position: [
        303,
        425
      ],
      size: [
        125,
        45
      ],
      category: "class-B"
    },
    {
      id: 58,
      name: "Building 58",
      position: [
        314,
        420
      ],
      size: [
        125,
        45
      ],
      category: "class-B"
    },
    {
      id: 58,
      name: "Building 58",
      position: [
        324,
        410
      ],
      size: [
        120,
        45
      ],
      category: "class-B"
    },
    {
      id: 59,
      name: "Building 59",
      position: [
        335,
        400
      ],
      size: [
        110,
        45
      ],
      category: "class-B"
    },
    {
      id: 60,
      name: "Building 60",
      position: [
        341,
        390
      ],
      size: [
        110,
        42
      ],
      category: "class-B"
    },
    {
      id: 61,
      name: "Building 61",
      position: [
        348,
        380
      ],
      size: [
        110,
        42
      ],
      category: "class-B"
    },
    {
      id: 62,
      name: "Building 62",
      position: [
        354,
        370
      ],
      size: [
        110,
        42
      ],
      category: "class-B"
    },
    {
      id: 63,
      name: "Building 63",
      position: [
        360,
        360
      ],
      size: [
        110,
        42
      ],
      category: "class-B"
    },
    {
      id: 64,
      name: "Building 64",
      position: [
        365,
        354
      ],
      size: [
        110,
        35
      ],
      category: "class-B"
    },
    {
      id: 66,
      name: "Building 66",
      position: [
        372,
        350
      ],
      size: [
        110,
        35
      ],
      category: "class-B"
    },
    {
      id: 67,
      name: "Building 67",
      position: [
        376,
        342
      ],
      size: [
        110,
        35
      ],
      category: "class-B"
    },
    {
      id: 68,
      name: "Building 68",
      position: [
        350,
        297
      ],
      size: [
        135,
        40
      ],
      category: "class-B"
    },
    {
      id: 69,
      name: "Building 69",
      position: [
        343,
        305
      ],
      size: [
        135,
        40
      ],
      category: "class-B"
    },
    {
      id: 70,
      name: "Building 70",
      position: [
        337,
        312
      ],
      size: [
        135,
        40
      ],
      category: "class-B"
    },
    {
      id: 71,
      name: "Building 71",
      position: [
        331,
        320
      ],
      size: [
        135,
        40
      ],
      category: "class-B"
    },
    {
      id: 72,
      name: "Building 72",
      position: [
        325,
        330
      ],
      size: [
        142,
        45
      ],
      category: "class-B"
    },
    {
      id: 73,
      name: "Building 73",
      position: [
        317,
        340
      ],
      size: [
        142,
        45
      ],
      category: "class-B"
    },
    {
      id: 74,
      name: "Building 74",
      position: [
        309,
        350
      ],
      size: [
        142,
        49
      ],
      category: "class-B"
    },
    {
      id: 75,
      name: "Building 75",
      position: [
        300,
        360
      ],
      size: [
        142,
        49
      ],
      category: "class-B"
    },
    {
      id: 76,
      name: "Building 76",
      position: [
        288,
        370
      ],
      size: [
        142,
        52
      ],
      category: "class-B"
    },
    {
      id: 77,
      name: "Building 77",
      position: [
        275,
        380
      ],
      size: [
        142,
        48
      ],
      category: "class-B"
    },
    {
      id: 78,
      name: "Building 78",
      position: [
        263,
        385
      ],
      size: [
        145,
        55
      ],
      category: "class-B"
    },
    {
      id: 79,
      name: "Building 79",
      position: [
        248,
        390
      ],
      size: [
        158,
        57
      ],
      category: "class-B"
    },
    {
      id: 80,
      name: "Building 80",
      position: [
        233,
        397
      ],
      size: [
        170,
        55
      ],
      category: "class-B"
    },
    {
      id: 81,
      name: "Building 81",
      position: [
        220,
        400
      ],
      size: [
        175,
        50
      ],
      category: "class-B"
    },
    {
      id: 82,
      name: "Building 82",
      position: [
        208,
        402
      ],
      size: [
        180,
        65
      ],
      category: "class-B"
    },
    {
      id: 83,
      name: "Building 83",
      position: [
        191,
        402
      ],
      size: [
        175,
        79
      ],
      category: "class-B"
    },
    {
      id: 84,
      name: "Building 84",
      position: [
        191,
        357
      ],
      size: [
        175,
        79
      ],
      category: "class-B"
    },
    {
      id: 85,
      name: "Building 85",
      position: [
        209,
        358
      ],
      size: [
        176,
        68
      ],
      category: "class-B"
    },
    {
      id: 86,
      name: "Building 86",
      position: [
        225,
        356
      ],
      size: [
        175,
        60
      ],
      category: "class-B"
    },
    {
      id: 87,
      name: "Building 87",
      position: [
        241,
        356
      ],
      size: [
        175,
        60
      ],
      category: "class-B"
    },
    {
      id: 88,
      name: "Building 88",
      position: [
        255,
        350
      ],
      size: [
        175,
        58
      ],
      category: "class-B"
    },
    {
      id: 89,
      name: "Building 89",
      position: [
        269,
        340
      ],
      size: [
        150,
        55
      ],
      category: "class-B"
    },
    {
      id: 90,
      name: "Building 90",
      position: [
        280,
        325
      ],
      size: [
        140,
        45
      ],
      category: "class-B"
    },
    {
      id: 91,
      name: "Building 91",
      position: [
        290,
        320
      ],
      size: [
        140,
        45
      ],
      category: "class-B"
    },
    {
      id: 92,
      name: "Building 92",
      position: [
        298,
        310
      ],
      size: [
        130,
        45
      ],
      category: "class-B"
    },
    {
      id: 93,
      name: "Building 93",
      position: [
        305,
        300
      ],
      size: [
        140,
        45
      ],
      category: "class-B"
    },
    {
      id: 94,
      name: "Building 94",
      position: [
        313,
        290
      ],
      size: [
        140,
        45
      ],
      category: "class-B"
    },
    {
      id: 95,
      name: "Building 95",
      position: [
        321,
        283
      ],
      size: [
        130,
        45
      ],
      category: "class-B"
    },
    {
      id: 96,
      name: "Building 96",
      position: [
        328,
        275
      ],
      size: [
        130,
        40
      ],
      category: "class-B"
    },
    {
      id: 97,
      name: "Building 97",
      position: [
        335,
        270
      ],
      size: [
        130,
        40
      ],
      category: "class-B"
    },
    {
      id: 98,
      name: "Building 98",
      position: [
        322,
        155
      ],
      size: [
        58,
        110
      ],
      category: "class-A"
    },
    {
      id: 99,
      name: "Building 99",
      position: [
        322,
        170
      ],
      size: [
        58,
        110
      ],
      category: "class-A"
    },
    {
      id: 100,
      name: "Building 100",
      position: [
        322,
        185
      ],
      size: [
        58,
        110
      ],
      category: "class-A"
    },
    {
      id: 101,
      name: "Building 101",
      position: [
        294,
        143
      ],
      size: [
        54,
        120
      ],
      category: "class-A"
    },
    {
      id: 102,
      name: "Building 102",
      position: [
        294,
        157
      ],
      size: [
        52,
        120
      ],
      category: "class-A"
    },
    {
      id: 103,
      name: "Building 103",
      position: [
        294,
        170
      ],
      size: [
        48,
        120
      ],
      category: "class-A"
    },
    {
      id: 104,
      name: "Building 104",
      position: [
        294,
        183
      ],
      size: [
        48,
        120
      ],
      category: "class-A"
    },
    {
      id: 105,
      name: "Building 105",
      position: [
        294,
        200
      ],
      size: [
        64,
        120
      ],
      category: "class-A"
    },
    {
      id: 106,
      name: "Building 106",
      position: [
        294,
        220
      ],
      size: [
        78,
        120
      ],
      category: "class-A"
    },
    {
      id: 107,
      name: "Building 107",
      position: [
        242,
        112
      ],
      size: [
        60,
        151
      ],
      category: "class-D"
    },
    {
      id: 108,
      name: "Building 108",
      position: [
        242,
        127
      ],
      size: [
        58,
        151
      ],
      category: "class-D"
    },
    {
      id: 109,
      name: "Building 109",
      position: [
        242,
        141
      ],
      size: [
        52,
        151
      ],
      category: "class-D"
    },
    {
      id: 110,
      name: "Building 110",
      position: [
        242,
        156
      ],
      size: [
        56,
        151
      ],
      category: "class-A"
    },
    {
      id: 111,
      name: "Building 111",
      position: [
        242,
        173
      ],
      size: [
        60,
        151
      ],
      category: "class-A"
    },
    {
      id: 112,
      name: "Building 112",
      position: [
        242,
        189
      ],
      size: [
        58,
        151
      ],
      category: "class-C"
    },
    {
      id: 113,
      name: "Building 113",
      position: [
        242,
        203
      ],
      size: [
        52,
        151
      ],
      category: "class-C"
    },
    {
      id: 114,
      name: "Building 114",
      position: [
        242,
        217
      ],
      size: [
        55,
        151
      ],
      category: "class-C"
    },
    {
      id: 115,
      name: "Building 115",
      position: [
        242,
        236
      ],
      size: [
        72,
        151
      ],
      category: "class-C"
    },
    {
      id: 116,
      name: "Building 116",
      position: [
        242,
        257
      ],
      size: [
        78,
        151
      ],
      category: "class-C"
    },
    {
      id: 117,
      name: "Building 117",
      position: [
        202,
        263
      ],
      size: [
        78,
        157
      ],
      category: "class-D"
    },
    {
      id: 118,
      name: "Building 118",
      position: [
        202,
        242
      ],
      size: [
        72,
        157
      ],
      category: "class-A"
    },
    {
      id: 119,
      name: "Building 119",
      position: [
        202,
        222
      ],
      size: [
        60,
        157
      ],
      category: "class-A"
    },
    {
      id: 120,
      name: "Building 120",
      position: [
        202,
        205
      ],
      size: [
        48,
        157
      ],
      category: "class-A"
    },
    {
      id: 121,
      name: "Building 121",
      position: [
        202,
        192
      ],
      size: [
        58,
        157
      ],
      category: "class-A"
    },
    {
      id: 122,
      name: "Building 122",
      position: [
        202,
        175
      ],
      size: [
        60,
        157
      ],
      category: "class-A"
    },
    {
      id: 123,
      name: "Building 123",
      position: [
        202,
        158
      ],
      size: [
        60,
        157
      ],
      category: "class-A"
    },
    {
      id: 124,
      name: "Building 124",
      position: [
        202,
        141
      ],
      size: [
        50,
        157
      ],
      category: "class-A"
    },
    {
      id: 125,
      name: "Building 125",
      position: [
        202,
        127
      ],
      size: [
        58,
        157
      ],
      category: "class-A"
    },
    {
      id: 126,
      name: "Building 126",
      position: [
        202,
        112
      ],
      size: [
        60,
        157
      ],
      category: "class-A"
    },
    {
      id: 127,
      name: "Building 127",
      position: [
        202,
        96
      ],
      size: [
        60,
        157
      ],
      category: "class-A"
    },
    {
      id: 128,
      name: "Building 128",
      position: [
        130,
        58
      ],
      size: [
        65,
        210
      ],
      category: "class-B"
    },
    {
      id: 129,
      name: "Building 129",
      position: [
        130,
        77
      ],
      size: [
        68,
        210
      ],
      category: "class-B"
    },
    {
      id: 130,
      name: "Building 130",
      position: [
        130,
        98
      ],
      size: [
        70,
        210
      ],
      category: "class-B"
    },
    {
      id: 131,
      name: "Building 131",
      position: [
        130,
        118
      ],
      size: [
        70,
        210
      ],
      category: "class-B"
    },
    {
      id: 132,
      name: "Building 132",
      position: [
        130,
        138
      ],
      size: [
        70,
        210
      ],
      category: "class-B"
    },
    {
      id: 133,
      name: "Building 133",
      position: [
        130,
        160
      ],
      size: [
        72,
        210
      ],
      category: "class-B"
    },
    {
      id: 134,
      name: "Building 134",
      position: [
        130,
        182
      ],
      size: [
        74,
        210
      ],
      category: "class-B"
    },
    {
      id: 135,
      name: "Building 135",
      position: [
        130,
        201
      ],
      size: [
        70,
        210
      ],
      category: "class-B"
    },
    {
      id: 136,
      name: "Building 136",
      position: [
        130,
        221
      ],
      size: [
        70,
        210
      ],
      category: "class-B"
    },
    {
      id: 137,
      name: "Building 137",
      position: [
        130,
        243
      ],
      size: [
        70,
        210
      ],
      category: "class-B"
    },
    {
      id: 138,
      name: "Building 138",
      position: [
        130,
        262
      ],
      size: [
        70,
        210
      ],
      category: "class-B"
    },
    {
      id: 139,
      name: "Building 139",
      position: [
        130,
        281
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 140,
      name: "Building 140",
      position: [
        130,
        301
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 141,
      name: "Building 141",
      position: [
        130,
        321
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 142,
      name: "Building 142",
      position: [
        130,
        341
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 143,
      name: "Building 143",
      position: [
        130,
        361
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 144,
      name: "Building 144",
      position: [
        130,
        382
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 145,
      name: "Building 145",
      position: [
        130,
        402
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 146,
      name: "Building 146",
      position: [
        130,
        423
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 147,
      name: "Building 147",
      position: [
        130,
        443
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 148,
      name: "Building 148",
      position: [
        130,
        465
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 149,
      name: "Building 149",
      position: [
        130,
        485
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 150,
      name: "Building 150",
      position: [
        130,
        505
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },
    {
      id: 151,
      name: "Building 151",
      position: [
        130,
        525
      ],
      size: [
        70,
        210
      ],
      category: "class-A"
    },

  ]

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
      html: `<div style="background: rgba(255, 0, 0, 0.3); width: ${iconSize[0]}px; height: ${iconSize[1]}px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; transition: all 0.3s ease transform" class=${clsx((building.id >= 12 && building.id <= 19) ? "rotate-[-20deg]" : ((building.id >= 20 && building.id <= 39) || (building.id >= 20 && building.id <= 27) || (building.id >= 55 && building.id <= 76) || (building.id >= 90 && building.id <= 97)) ? "rotate-[-35deg]" : "")}>${building.id}</div>`,
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
          {unitsData.map((building) => (
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

