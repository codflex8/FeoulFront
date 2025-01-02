import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import clsx from "clsx";
import { useTranslations } from 'next-intl';
import Image from "next/image";

const DropdownPlacesOptionsMenu = ({ selectedTypes, setSelectedTypes }: { selectedTypes: string[], setSelectedTypes: React.ComponentState}) => {
  const t = useTranslations('MapPage');

  const handleShowAllBtn = () => {
    setSelectedTypes((prev: string[]) => (
      prev.includes("places") &&
        prev.includes("educate") &&
        prev.includes("mall") &&
        prev.includes("health") ? [] : ["places", "educate", "mall", "health"]
    ))
  }

  const toggleType = (type: string) => {
    setSelectedTypes((prev: string[]) =>
      prev.includes(type) ? prev.filter((t: string ) => t !== type) : [...prev, type]
    );
  };

return (
  <div className="flex flex-col bg-slate-600 py-4 px-8 rounded-md gap-3 w-fit">
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
          className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedTypes.includes("places") && 'bg-slate-400')}
          checked={selectedTypes.includes("places")}
          onCheckedChange={() => toggleType("places")}
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
)
}

export default DropdownPlacesOptionsMenu;