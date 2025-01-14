"use client";

import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { LatLng, MapProps } from "@/types/map.types";

import clsx from "clsx";

import { useTranslations } from 'next-intl';
import DropdownPlacesOptionsMenu from "./DropdownPlacesOptions";
import WebsiteTitleSec from "./WebsiteTitleSec";
import ControlFunctions from "./ControlFunctions";
import AlwaysOpenPopup from "./AlwaysOpenPopup";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import NeedHelpForm from "./form/NeedHelpForm";

const getCustomIcon = (iconName: string, size?: number) => {
  const iconPath = size ? `/assets/icons/${iconName}.svg` : `/assets/icons/${iconName}-marker.svg`
  const customIcon = new L.Icon({
    iconUrl: iconPath,
    iconSize: size ? [size, size] : [72, 72],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return customIcon;
}

const Map = ({ projects, basicLandmarks, landmarks }: MapProps) => {
  const t = useTranslations('MapPage');

  const [selectedTypes, setSelectedTypes] = useState<string[]>(["places"])
  const [openHelpForm, setOpenHelpForm] = useState<boolean>(false);


  const filteredLandmarks = landmarks.filter(landmark =>
    selectedTypes.length ? selectedTypes.includes(landmark.type) : []
  )

  projects.map((pro, key) => console.log(pro.lat))

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


  const position: LatLng[] = [
    [21.713749258798922, 39.12805840919132],
    [21.70654215541264, 39.13234536865425],
    [21.70312813836255, 39.12499629528922],
    [21.698386313695085, 39.12458801343561],
    [21.697248252537044, 39.12009691304587],
    [21.709197446022582, 39.115197530802526],
    [21.71507684373483, 39.118259644704615],
    [21.716783720651417, 39.12581285899645],
    [21.713749258798922, 39.12805840919132],
  ]

  return (
    <div className="h-full w-full relative">
      <ControlFunctions selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} setOpenHelpForm={setOpenHelpForm} />

      <div className={clsx("absolute top-4 z-[1000]", t("language").toLowerCase() === 'en' ? "right-[10px]" : "left-[10px]")}>
        <WebsiteTitleSec />

        <DropdownPlacesOptionsMenu selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      </div>

      <MapContainer
        center={[21.758334, 39.056873]}
        zoom={12}
        maxZoom={13}
        minZoom={11}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        style={{ height: "100vh", width: "100vw" }}
      >
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> */}

        {/* <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        /> */}

        {/* <TileLayer
          url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
          attribution='Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> */}

        {/* NICE */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
        />

        {/* <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
        /> */}

        {/* <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors & <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        /> */}

        {/* <Polygon key={idx} positions={position} pathOptions={fillPolygonOptions}> */}
        {projects.map((project, idx) => (
          <AlwaysOpenPopup key={idx} position={[project.lat, project.lng]} project={project}>
            {project.name}
          </AlwaysOpenPopup>
        ))}
        {/* </Polygon> */}

        {selectedTypes.includes("places") && basicLandmarks.map((landmark, idx) => (
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
                marker.openPopup();
              },
              mouseout: (e) => {
                const marker = e.target;
                marker.closePopup();
              },
            }}>

            <Popup className={clsx("places-popup !h-2 !text-xs !rounded-full", landmark.type == "educate" ? "bg-[#8A93DD]" : landmark.type == "mall" ? "bg-[#FCB270]" : landmark.type == "health" ? "bg-[#EB7979]" : "bg-[#8d8e93]")} closeButton={false}>{landmark.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

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

export default Map;
