"use client";

import L from "leaflet";
import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { MapProps, Project } from "@/types/map.types";
import Link from "next/link";
import MapControlBtn from "./MapControlBtn";
import Image from "next/image";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import clsx from "clsx";
import { useToast } from "@/hooks/use-toast";

import {useTranslations} from 'next-intl';
import { useRouter } from "next/navigation";


type Checked = DropdownMenuCheckboxItemProps["checked"]

const getCustomIcon = (iconName: string, size?: number) => {
  const iconPath = size ? `/assets/icons/${iconName}.svg` : `/assets/icons/${iconName}-marker.svg`
  const customIcon = new L.Icon({
    iconUrl: iconPath,
    // shadowUrl: '/assets/educate-marker.svg',
    iconSize: size ? [size, size] : [72, 72],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return customIcon;
}

const AlwaysOpenPopup = ({ position, children }: { position: [number, number]; children: React.ReactNode }) => {
  const map = useMap();

  useEffect(() => {
    const popup = L.popup({ autoClose: false, closeOnClick: false, closeButton: false, })
      .setLatLng(position)
      .setContent(children as string)
      .openOn(map);

    return () => {
      map.closePopup(popup);
    };
  }, [map, position, children]);

  return null;
};

const Map = ({ projects, basicLandmarks, landmarks }: MapProps) => {
  const t = useTranslations('MapPage');
  const router = useRouter();

  const mapRef = useRef<L.Map | null>(null);

  const [isFullScreen, setIsFullScreen] = useState<Checked>(false);
  const [showPlaces, setShowPlaces] = useState<Checked>(true)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["places"])

  const { toast } = useToast()

  const filteredLandmarks = landmarks.filter(landmark =>
    selectedTypes.length ? selectedTypes.includes(landmark.type) : []
  )

  const bounds = L.latLngBounds(
    [21.25, 39.05],
    [21.80, 39.45]
  );

  const fillPolygonOptions = {
    color: "green",
    weight: 2,
    opacity: 0.8,
    fillColor: "green",
    fillOpacity: 0.3,
  }

  // Handle For Full Screen Button
  const handleFullScreen = () => {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      element.requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((error) => console.error(`Error entering full-screen mode: ${error.message}`));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullScreen(false))
        .catch((error) => console.error(`Error exiting full-screen mode: ${error.message}`));
    }
  }

  // Handle For Share Website Button
  const handleShareWebsite = async () => {
    if (navigator.share) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        await navigator.share({
          title: document.title,
          text: 'تفحص ها الموقع',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          description: 'تم نسخ الرابط إلى الحافظة',
          duration: 5000,
          style: { width: '200px', paddingLeft: '40px', margin: '10px', textAlign: 'center', fontSize: '18px' }
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "حدث خطأ ما",
          description: "غير قادر على نسخ رابط الموقع",
        })
      }
    }
  };

  // Handle For Hide Places Button
  const handleHidePlaces = () => {
    setShowPlaces(!showPlaces);
    setSelectedTypes([]);
  }

  // Handle For Change Language Button

  const handleChangeLanguage = (lang : string) => { 
    router.push(`/${lang}`);    
  }

  // Handle For Ask For Help Button
  const handleAskHelp = () => { }

  const handleShowAllBtn = () => {
    setSelectedTypes(prev => prev.length ? [] : ["places", "educate", "mall", "health"])
    setShowPlaces(prev => !prev)
  }

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const findNearestProject = (
      projects: Project[],
      landmarkPosition: [number, number]
    ) => {
      let nearestProject: Project | null = null;
      let minDistance = Infinity;

      projects.forEach((project) => {
        const distance = Math.sqrt(
          Math.pow(project.position[0][0] - landmarkPosition[0], 2) +
          Math.pow(project.position[1][0] - landmarkPosition[1], 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestProject = project;
        }
      });

      return nearestProject;
    };

    const handleClick = (landmarkPosition: [number, number]) => {
      const nearestProject = findNearestProject(projects, landmarkPosition);
      if (nearestProject) {
        L.Routing.control({
          waypoints: [
            L.latLng(nearestProject.position),
            L.latLng(landmarkPosition),
          ],
          routeWhileDragging: true,
        }).addTo(map);
      }
    };

    landmarks.forEach((landmark) => {
      const marker = L.marker(landmark.position).addTo(map);
      marker.bindPopup(
        `<strong>${landmark.name}</strong><br/>
         <button onclick="(${handleClick.toString()})(${JSON.stringify(
          landmark.position
        )})">Show Route</button>`
      );
    });
  }, [projects, landmarks]);

  useEffect(() => {
    const updateZoomControlPosition = () => {
      const map = document.querySelector('.leaflet-container');
      const zoomControl = map?.querySelector('.leaflet-top.leaflet-left') as HTMLElement;

      if (zoomControl) {
        if (t("language").toLowerCase() === 'en') {
          zoomControl.style.right = 'auto';
        } else {
          zoomControl.style.right = '10px';
          zoomControl.style.left = 'auto';
        }
      }
    };

    updateZoomControlPosition();
  }, [t("language")]);

  return (
    <div className="h-full w-full relative">

      <div>
        <div className={clsx("absolute top-20 z-[1000]", t("language").toLowerCase() == 'ar' ? "right-[10px]" : "left-[10px]")}>
          <MapControlBtn onClick={handleHidePlaces} icon={selectedTypes.length || showPlaces ? 'eyes-dash' : 'eyes'} title={selectedTypes.length || showPlaces ? t("HidePlaces") : t("ShowPlaces")} />
          <MapControlBtn onClick={() => handleChangeLanguage(t("language").toLowerCase())} text={t("language")} title={t("ChangeLanguage")} />
        </div>

        <div className={clsx("absolute bottom-4 z-[1000]", t("language").toLowerCase() == 'ar' ? "right-[10px]" : "left-[10px]")}>
          <MapControlBtn onClick={handleAskHelp} icon="question" title={t('AskHelp')}/>
          <MapControlBtn onClick={handleShareWebsite} icon="share" title={t("ShareWebsite")} />
          <MapControlBtn onClick={handleFullScreen} icon={isFullScreen ? 'small-screen' : 'full-screen'} title={isFullScreen ? t("SmallScreen") : t("FullScreen")} />
        </div>
      </div>

      <div className={clsx("absolute top-4 z-[1000]", t("language").toLowerCase() === 'en' ? "right-[10px]" : "left-[10px]")}>
        <div className="bg-slate-600 rounded-md px-4 py-3 mb-4 flex items-center gap-6">
          <Link href='/'>
            <Image
              src='/assets/icons/logo.svg'
              alt="logo"
              width={70}
              height={32}
            />
          </Link>
          <span className="bg-white text-slate-600 text-sm font-semibold rounded-md py-1 px-4 flex items-center">
            {t("JaddahCity")}
          </span>
        </div>
        <div className="flex flex-col bg-slate-600 py-4 px-8 rounded-md gap-3">
          <h3 className="font-semibold text-sm text-center text-white">{t("MapOptions")}</h3>
          <Button variant="showALl"
            className={clsx(
              selectedTypes.includes("places") &&
              selectedTypes.includes("educate") &&
              selectedTypes.includes("mall") &&
              selectedTypes.includes("health") &&
              "bg-white text-slate-600"
            )}
            onClick={handleShowAllBtn}>{t("ShowAll")}</Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-6">
                <span>{t("MapPlaces")}</span>
                <Image
                  src='/assets/icons/right-arrow.svg'
                  alt="arrow"
                  width={10}
                  height={10}
                  className="transform rotate-90 -translate-y-[1px]"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 !z-[1000]">
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", showPlaces && 'bg-slate-400')}
                checked={showPlaces}
                onCheckedChange={setShowPlaces}
              >
                <span className="block text-base text-slate-500 font-semibold">{t("Places")}</span>
                <Image src="/assets/icons/places.svg" alt="places" width={17} height={17} />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedTypes.includes("mall") && 'bg-slate-400')}
                checked={selectedTypes.includes("mall")}
                onCheckedChange={() => toggleType("mall")}
              >
                <span className="block text-base text-slate-500 font-semibold">{t("Malls")}</span>
                <Image src="/assets/icons/mall.svg" alt="mall" width={17} height={17} />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedTypes.includes("educate") && 'bg-slate-400')}
                checked={selectedTypes.includes("educate")}
                onCheckedChange={() => toggleType("educate")}
              >
                <span className="block text-base text-slate-500 font-semibold">{t("Educate")}</span>
                <Image src="/assets/icons/educate.svg" alt="educate" width={17} height={17} />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedTypes.includes("health") && 'bg-slate-400')}
                checked={selectedTypes.includes("health")}
                onCheckedChange={() => toggleType("health")}
              >
                <span className="block text-base text-slate-500 font-semibold">{t("Health")}</span>
                <Image src="/assets/icons/health.svg" alt="health" width={17} height={17} />
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <MapContainer
        center={[21.614635, 39.230685]}
        zoom={12}
        maxZoom={13}
        minZoom={11}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        style={{ height: "100vh", width: "100%" }}
        // whenCreated={(mapInstance) => {
        //   mapRef.current = mapInstance;
        // }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {projects.map((project, idx) => (
          <Polygon key={idx} positions={project.position} pathOptions={fillPolygonOptions}>
            <Popup position={project.position[0]} autoClose={false} closeOnClick={false} closeButton={false} keepInView={true}>
              <Link className="!text-white" href={`/real-estate/${project.id}`}>
                {project.name}
              </Link>
            </Popup>
          </Polygon>
        ))}

        {showPlaces && basicLandmarks.map((landmark, idx) => (
          <Marker key={idx} position={landmark.position} icon={getCustomIcon(landmark.type)}>
          </Marker>
        ))}
        {selectedTypes.length && filteredLandmarks.map((landmark, idx) => (
          <Marker 
          key={idx} 
          position={landmark.position} 
          icon={getCustomIcon(landmark.type, 20)} 
          eventHandlers={{
            mouseover: (e) => {
              const marker = e.target;
              marker.openPopup(); // Open popup on hover
            },
            mouseout: (e) => {
              const marker = e.target;
              marker.closePopup(); // Close popup when mouse leaves
            },
          }}>
            
            <Popup className="!h-2 !text-xs ">{landmark.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

// "use client";

// import L from "leaflet";
// import React, { useRef, useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import { MapProps, Project } from "@/types/map.types";
// import Link from "next/link";
// import MapControlBtn from "./MapControlBtn";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import clsx from "clsx";
// import { useToast } from "@/hooks/use-toast";

// const getCustomIcon = (iconName: string, size?: number) => {
//   const iconPath = size ? `/assets/icons/${iconName}.svg` : `/assets/icons/${iconName}-marker.svg`;
//   return new L.Icon({
//     iconUrl: iconPath,
//     iconSize: size ? [size, size] : [72, 72],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
//   });
// };

// const Map = ({ projects, basicLandmarks, landmarks }: MapProps) => {
//   const mapRef = useRef<L.Map | null>(null);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showPlaces, setShowPlaces] = useState(true);
//   const [selectedTypes, setSelectedTypes] = useState<string[]>(["places"]);
//   const { toast } = useToast();

//   const filteredLandmarks = landmarks.filter(landmark =>
//     selectedTypes.length ? selectedTypes.includes(landmark.type) : []
//   );

//   const bounds = L.latLngBounds([21.25, 39.05], [21.80, 39.45]);

//   const fillPolygonOptions = {
//     color: "green",
//     weight: 2,
//     opacity: 0.8,
//     fillColor: "green",
//     fillOpacity: 0.3,
//   };

//   const handleFullScreen = () => {
//     const element = document.documentElement;
//     if (!document.fullscreenElement) {
//       element.requestFullscreen().then(() => setIsFullScreen(true)).catch((error) => console.error(`Error entering full-screen mode: ${error.message}`));
//     } else {
//       document.exitFullscreen().then(() => setIsFullScreen(false)).catch((error) => console.error(`Error exiting full-screen mode: ${error.message}`));
//     }
//   };

//   const handleShareWebsite = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.clipboard.writeText(window.location.href);
//         await navigator.share({
//           title: document.title,
//           text: 'تفحص ها الموقع',
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.error('Error sharing content:', error);
//       }
//     } else {
//       try {
//         await navigator.clipboard.writeText(window.location.href);
//         toast({
//           description: 'تم نسخ الرابط إلى الحافظة',
//           duration: 5000,
//           style: { width: '200px', paddingLeft: '40px', margin: '10px', textAlign: 'center', fontSize: '18px' }
//         });
//       } catch (error) {
//         toast({
//           variant: "destructive",
//           title: "حدث خطأ ما",
//           description: "غير قادر على نسخ رابط الموقع",
//         });
//       }
//     }
//   };

//   const handleHidePlaces = () => {
//     setShowPlaces(!showPlaces);
//     setSelectedTypes([]);
//   };

//   const toggleType = (type: string) => {
//     setSelectedTypes(prev =>
//       prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
//     );
//   };

//   const findNearestProject = (projects: Project[], landmarkPosition: [number, number]) => {
//     let nearestProject: Project | null = null;
//     let minDistance = Infinity;

//     projects.forEach((project) => {
//       const distance = Math.sqrt(
//         Math.pow(project.position[0][0] - landmarkPosition[0], 2) +
//         Math.pow(project.position[1][0] - landmarkPosition[1], 2)
//       );

//       if (distance < minDistance) {
//         minDistance = distance
//                 nearestProject = project;
//       }
//     });

//     return nearestProject;
//   };

//   const handleClick = (landmarkPosition: [number, number]) => {
//     const nearestProject = findNearestProject(projects, landmarkPosition);
//     if (nearestProject) {
//       L.Routing.control({
//         waypoints: [
//           L.latLng(nearestProject.position),
//           L.latLng(landmarkPosition),
//         ],
//         routeWhileDragging: true,
//       }).addTo(mapRef.current!);
//     }
//   };

//   useEffect(() => {
//     const map = mapRef.current;
//     if (!map) return;

//     landmarks.forEach((landmark) => {
//       const marker = L.marker(landmark.position).addTo(map);
//       marker.bindPopup(
//         `<strong>${landmark.name}</strong><br/>
//          <button onclick="(${handleClick.toString()})(${JSON.stringify(
//           landmark.position
//         )})">Show Route</button>`
//       );
//     });
//   }, [projects, landmarks]);

//   return (
//     <div className="h-full w-full relative">
//       <div>
//         <div className="absolute left-[10px] top-20 z-[1000]">
//           <MapControlBtn onClick={handleHidePlaces} icon={showPlaces ? 'eyes-dash' : 'eyes' } title={showPlaces ? 'أخفي المعالم' : 'أظهر المعالم'} />
//           <MapControlBtn onClick={() => {}} text="En" title="غيَر اللغة" />
//         </div>

//         <div className="absolute left-[10px] bottom-20 z-[1000]">
//           <MapControlBtn onClick={() => {}} icon="question" title="إطلب مساعدة" />
//           <MapControlBtn onClick={handleShareWebsite} icon="share" title="شارك الموقع" />
//           <MapControlBtn onClick={handleFullScreen} icon={isFullScreen ? 'small-screen' : 'full-screen'} title={isFullScreen ? 'أغلق الشاشة الكاملة' : 'شاشة كاملة'} />
//         </div>
//       </div>

//       <div className="absolute top-4 right-[10px] z-[1000]">
//         <div className="bg-slate-600 rounded-md px-4 py-3 mb-4 flex items-center gap-6">
//           <Link href='/'>
//             <Image
//               src='/assets/icons/logo.svg'
//               alt="logo"
//               width={70}
//               height={32}
//             />
//           </Link>
//           <span className="bg-white text-slate-600 text-sm font-semibold rounded-md py-1 px-4 flex items-center">
//             جدة
//           </span>
//         </div>
//         <div className="flex flex-col bg-slate-600 py-4 px-8 rounded-md gap-3">
//           <h3 className="font-semibold text-sm text-center text-white">إختيارات الخريطة</h3>
//           <Button variant="showALl" onClick={() => {}}>
//             عرض الكل
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-6">
//                 <span>معالم الخريطة</span>
//                 <Image
//                   src='/assets/icons/right-arrow.svg'
//                   alt="arrow"
//                   width={10}
//                   height={10}
//                   className="transform rotate-90 -translate-y-[1px]"
//                 />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-36 !z-[1000]">
//               <DropdownMenuSeparator />
//               <DropdownMenuCheckboxItem
//                 className={clsx("flex items-center justify-between mb-1 cursor-pointer", showPlaces && 'bg-slate-400')}
//                 checked={showPlaces}
//                 onCheckedChange={setShowPlaces}
//               >
//                 <span className="block text-base text-slate-500 font-semibold">معالم</span>
//                 <Image src="/assets/icons/places.svg" alt="places" width={17} height={17} />
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem
//                 className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedTypes.includes("mall") && 'bg-slate-400')}
//                 checked={selectedTypes.includes("mall")}
//                 onCheckedChange={() => toggleType("mall")}
//               >
//                 <span className="block text-base text-slate-500 font-semibold">التجزئة</span>
//                 <Image src="/assets/icons/mall.svg" alt="mall" width={17} height={17} />
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem
//                 className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedTypes.includes("educate") && 'bg-slate-400')}
//                 checked={selectedTypes.includes("educate")}
//                 onCheckedChange={() => toggleType("educate")}
//               >
//                 <span className="block text-base text-slate-500 font-semibold">التعليم</span>
//                 <Image src="/assets/icons/educate.svg" alt="educate" width={17} height={17} />
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem
//                 className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedTypes.includes("health") && 'bg-slate-400')}
//                 checked={selectedTypes.includes("health")}
//                 onCheckedChange={() => toggleType("health")}
//               >
//                 <span className="block text-base text-slate-500 font-semibold">الصحة</span>
//                 <Image src="/assets/icons/health.svg" alt="health" width={17} height={17} />
//               </DropdownMenuCheckboxItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <MapContainer
//         center={[21.614635, 39.230685]}
//         zoom={12}
//         maxZoom={13}
//         minZoom={11}
//         maxBounds={bounds}
//         maxBoundsViscosity={1.0}
//         style={{ height: "100vh", width: "100%" }}
//         whenCreated={(mapInstance) => {
//           mapRef.current = mapInstance;
//         }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {projects.map((project, idx) => (
//           <Polygon key={idx} positions={project.position} pathOptions={fillPolygonOptions}>
//             <Popup position={project.position[0]} autoClose={false} closeOnClick={false} closeButton={false} keepInView={true}>
//               <Link className="!text-white" href={`/real-estate/${project.id}`}>
//                 {project.name}
//               </Link>
//             </Popup>
//           </Polygon>
//         ))}

//         {showPlaces && basicLandmarks.map((landmark, idx) => (
//           <Marker key={idx} position={landmark.position} icon={getCustomIcon(landmark.type)}>
//             <Popup>{landmark.name}</Popup>
//           </Marker>
//         ))}
        
//         {selectedTypes.length && filteredLandmarks.map((landmark, idx) => (
//           <Marker key={idx} position={landmark.position} icon={getCustomIcon(landmark.type, 20)}>
//             <Popup>{landmark.name}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default Map;