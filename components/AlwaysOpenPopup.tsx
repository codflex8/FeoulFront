import L from "leaflet";
import { Project } from "@/types/map.types";
import React, { useEffect } from "react";
import { useTranslations } from 'next-intl';
import { useMap } from "react-leaflet";


const AlwaysOpenPopup = ({ position, children, project }: { position: [number, number]; children: React.ReactNode, project: Project }) => {
  const map = useMap();
  const t = useTranslations("MapPage")
  const language = t("language").toLowerCase() == "en" ? "ar" : "en";


  useEffect(() => {
    const popup = L.popup({ autoClose: false, closeOnClick: false, closeButton: false, className: "projects-popup" })
      .setLatLng(position)
      .setContent(`<a href=${`${language}/real-estate/${project.id}`}>
                    ${project.name}
                  </a>`)
      .openOn(map);

    return () => {
      map.closePopup(popup);
    };
  }, [map, position, children]);

  return null;
};

export default AlwaysOpenPopup;