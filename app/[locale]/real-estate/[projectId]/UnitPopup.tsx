import { useRouter, usePathname } from "next/navigation";
import { Popup } from "react-leaflet";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { Unit } from "@/types/map.types";

type Props = {
  unit: Unit;
};

const UnitPopup = ({ unit }: Props) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const t = useTranslations("BuildingViewPage");

  //   click: () => push(`${pathname}/building-view/${unit.id}`),
  return (
    <Popup className="min-w-64">
      <div className="text-sm">
        <h6 className="text-base font-bold flex items-center justify-between">
          <span>{unit.name}</span>
          <span className="text-xs text-gray-500">{unit.status}</span>
        </h6>
        <p className="flex items-center justify-between !my-0 mb-2">
          {unit.bedroomNumber} {t("Bedrooms")}, {unit.bathroomNumber}{" "}
          {t("Bathrooms")}
        </p>
        <p className="flex items-center justify-between !my-0">
          <span>{t("BuidingArea")}:</span>
          <span>
            {unit.buildSpace} {t("Meter")}
          </span>
        </p>
        <p className="flex items-center justify-between !my-0">
          <span>{t("LandArea")}:</span>
          <span>
            {unit.landSpace} {t("Meter")}
          </span>
        </p>
        <p className="flex items-center justify-between !my-0">
          <span>{t("Price")}:</span>
          <span>
            {unit.price} {t("Riyal")}
          </span>
        </p>
      </div>
      <Button
        className="w-full mt-1"
        onClick={() => push(`${pathname}/building-view/${unit.id}`)}
      >
        {t("ExploreUnit")}
      </Button>
    </Popup>
  );
};

export default UnitPopup;
