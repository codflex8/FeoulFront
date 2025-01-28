"use client";
import { useState } from "react";
import L from "leaflet";
import { Marker, useMap, useMapEvent } from "react-leaflet";
import { Unit } from "@/types/map.types";
import UnitPopup from "./UnitPopup";

const DynamicMarker = ({ unit }: { unit: Unit }) => {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());

  useMapEvent("zoomend", () => {
    setZoomLevel(map.getZoom());
  });

  const iconSize = [
    Number(unit.size[0]) * (zoomLevel / 2),
    Number(unit.size[1]) * (zoomLevel / 2),
  ];

  const icon = L.divIcon({
    className: "custom-icon",
    html: `<div style="background: ${unit.category.color};opacity: 0.2; width: ${iconSize[0]}px; height: ${iconSize[1]}px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; transition: all 0.3s ease transform" ></div>`,
  });

  return (
    <Marker
      position={[Number(unit.position[0]), Number(unit.position[1])]}
      icon={icon}
      title={`${unit.name} - ${unit.category.name} - ${unit.status}`}
    >
      <UnitPopup unit={unit} />
    </Marker>
  );
};

export default DynamicMarker;
