import clsx from "clsx"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Slider from 'react-slider';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Badge } from "./ui/badge";

interface DropdownMenuBlockProps {
  selectedCategories: string[];
  setSelectedCategories: React.ComponentState;
}

interface BuildingBlocksFitersProps {
  className: string;
  selectedCategories: string[];
  setSelectedCategories: React.ComponentState;
  price: [number, number];
  setPrice: React.ComponentState;
  space: [number, number];
  setSpace: React.ComponentState;
}

const DropdownMenuBlock = ({ selectedCategories, setSelectedCategories }: DropdownMenuBlockProps) => {
  const t = useTranslations('ProjectPage');

  const toggleType = (type: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.includes(type) ? prev.filter((t: string) => t !== type) : [...prev, type]
    );
  };

  return (
    <DropdownMenu dir={t("language").toLowerCase() === 'en' ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between gap-6 w-full">
          <span>{t("Category")}</span>
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
          className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedCategories.includes("category-a") && 'bg-slate-400')}
          checked={selectedCategories.includes("category-a")}
          onCheckedChange={() => toggleType("category-a")}
        >
          <span className="block text-base text-slate-500 font-semibold">فئة- A</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedCategories.includes("category-b") && 'bg-slate-400')}
          checked={selectedCategories.includes("category-b")}
          onCheckedChange={() => toggleType("category-b")}
        >
          <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedCategories.includes("category-c") && 'bg-slate-400')}
          checked={selectedCategories.includes("category-c")}
          onCheckedChange={() => toggleType("category-c")}
        >
          <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className={clsx("flex items-center justify-between mb-1 cursor-pointer", selectedCategories.includes("category-d") && 'bg-slate-400')}
          checked={selectedCategories.includes("category-d")}
          onCheckedChange={() => toggleType("category-d")}
        >
          <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const BuildingBlocksFiters = ({ className, selectedCategories, setSelectedCategories, price, setPrice, space, setSpace }: BuildingBlocksFitersProps) => {
  const t = useTranslations('ProjectPage');

  const handleShowAllBtn = () => {
    setSelectedCategories((prev: string[]) => (
      prev.includes("category-a") &&
        prev.includes("category-b") &&
        prev.includes("category-c") &&
        prev.includes("category-d") ? [] : ["category-a", "category-b", "category-c", "category-d"]
    ))
  }

  return (
    <div className={clsx("w-fit bg-slate-600 rounded-md px-4 transition-all ease-in-out overflow-hidden", className)}>

      <Tabs dir={t("language").toLowerCase() === 'en' ? "rtl" : "ltr"} defaultValue="available" className="w-fit bg-slate-600 rounded-md">
        <TabsList className="grid w-full grid-cols-3 bg-slate-600">
          <TabsTrigger value="available" className="text-white">{t("Avaliable")}</TabsTrigger>
          <TabsTrigger value="bocked" className="text-white">{t("Bocked")}</TabsTrigger>
          <TabsTrigger value="sold" className="text-white">{t("Sold")}</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="pb-4 pt-0 mt-0">
          <DropdownMenuSeparator className="mt-0" />
          <h1 className="text-sm font-semibold text-white mb-2">150 {t("AvaliableBlocks")}</h1>
          <DropdownMenuBlock selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        </TabsContent>

        <TabsContent value="bocked" className="pb-4 pt-0 mt-0">
          <DropdownMenuSeparator className="mt-0" />
          <h1 className="text-sm font-semibold text-white mb-2">150 {t("BockedBlocks")}</h1>
          <DropdownMenuBlock selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        </TabsContent>

        <TabsContent value="sold" className="pb-4 pt-0 mt-0">
          <DropdownMenuSeparator className="mt-0" />
          <h1 className="text-sm font-semibold text-white mb-2">150 {t("SoldBlocks")}</h1>
          <DropdownMenuBlock selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        </TabsContent>
      </Tabs>

      {/* price Range Slider */}
      <div className="py-2">
        <h1 className="font-bold text-sm text-gray-300 mb-8">
          {t("Price")}
          <Badge variant="secondary" className="mx-1">
            {t("Riyal")}
          </Badge>
        </h1>

        <Slider
          className="w-full h-2 bg-gray-300 rounded-md"
          thumbClassName="relative h-4 w-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
          trackClassName="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-md"
          value={price}
          onChange={(newValues) => setPrice(newValues as [number, number])}
          min={10000}
          max={100000}
          step={10}
          renderThumb={(props, state) => {
            const { key, ...rest } = props;
            return (
              <div
                key={key}
                {...rest}
                className="relative h-4 w-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-sm shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform top-[50%] transform translate-y-[-50%]"
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold">
                  {state.valueNow}
                </span>
              </div>
            )
          }}
        />
      </div>

      {/* Space Range Slider */}
      <div className="py-2">
        <h1 className="font-bold text-sm text-gray-300 mb-8">
          {t("TotalArea")}
          <Badge variant="secondary" className="mx-1">
            {t("Meter")}
          </Badge>
        </h1>

        <Slider
          className="w-full h-2 bg-gray-300 rounded-md"
          thumbClassName="relative h-4 w-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
          trackClassName="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-md"
          value={space}
          onChange={(newValues) => setSpace(newValues as [number, number])}
          min={150}
          max={400}
          step={10}
          renderThumb={(props, state) => {
            const { key, ...rest } = props;
            return (
              <div
                key={key}
                {...rest}
                className="relative h-4 w-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-sm shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform top-[50%] transform translate-y-[-50%]"
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold">
                  {state.valueNow}
                </span>
              </div>
            )
          }}
        />
      </div>

      {/* Show All Button */}
      <Button variant="showALl"
        className={clsx("w-full mt-4 bg-gradient-to-r from-blue-400 to-purple-500 transition-all",
          selectedCategories.includes("category-a") &&
          selectedCategories.includes("category-b") &&
          selectedCategories.includes("category-c") &&
          selectedCategories.includes("category-d") &&
          "!bg-white bg-none text-slate-600 !important"
        )}
        onClick={handleShowAllBtn}>{t("ShowAll")}</Button>
    </div>
  )
}

export default BuildingBlocksFiters;
