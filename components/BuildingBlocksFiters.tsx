import { useState } from "react"
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

const BuildingBlocksFiters = () => {
  const t = useTranslations('ProjectPage');
  const [price, setPrice] = useState<[number, number]>([10000, 100000]);
  const [space, setSpace] = useState<[number, number]>([150, 400]);
  const [categories, setCategories] = useState<string[]>(["category-A", "category-B", "category-C", "category-D"])

  const handleShowAllBtn = () => {
    setCategories((prev: string[]) => (
      prev.includes("category-A") &&
        prev.includes("category-B") &&
        prev.includes("category-C") &&
        prev.includes("category-D") ? [] : ["category-A", "category-B", "category-C", "category-D"]
    ))
  }

  const toggleType = (type: string) => {
    setCategories((prev: string[]) =>
      prev.includes(type) ? prev.filter((t: string) => t !== type) : [...prev, type]
    );
  };


  return (
    <div className="w-fit bg-slate-600 rounded-md p-4">

      <Tabs dir="rtl" defaultValue="available" className="w-fit bg-slate-600 rounded-md">
        <TabsList className="grid w-full grid-cols-3 bg-slate-600">
          <TabsTrigger value="available" className="text-white">متاح</TabsTrigger>
          <TabsTrigger value="bocked" className="text-white">تم حجزه</TabsTrigger>
          <TabsTrigger value="sold" className="text-white">تم البيع</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="p-4 pt-0 mt-0">
          <DropdownMenuSeparator className="mt-0" />
          <h1 className="text-sm font-semibold text-white mb-2">150 من الوحدات المتاحة</h1>
          <DropdownMenu>
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
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-A") && 'bg-slate-400')}
                checked={categories.includes("category-A")}
                onCheckedChange={() => toggleType("category-A")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة- A</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-B") && 'bg-slate-400')}
                checked={categories.includes("category-B")}
                onCheckedChange={() => toggleType("category-B")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-C") && 'bg-slate-400')}
                checked={categories.includes("category-C")}
                onCheckedChange={() => toggleType("category-C")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-D") && 'bg-slate-400')}
                checked={categories.includes("category-D")}
                onCheckedChange={() => toggleType("category-D")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsContent>

        <TabsContent value="bocked" className="p-4 pt-0 mt-0">
          <DropdownMenuSeparator className="mt-0" />
          <h1 className="text-sm font-semibold text-white mb-2">150 من الوحدات المحجوزة</h1>
          <DropdownMenu>
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
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-A") && 'bg-slate-400')}
                checked={categories.includes("category-A")}
                onCheckedChange={() => toggleType("category-A")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة- A</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-B") && 'bg-slate-400')}
                checked={categories.includes("category-B")}
                onCheckedChange={() => toggleType("category-B")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-C") && 'bg-slate-400')}
                checked={categories.includes("category-C")}
                onCheckedChange={() => toggleType("category-C")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-D") && 'bg-slate-400')}
                checked={categories.includes("category-D")}
                onCheckedChange={() => toggleType("category-D")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsContent>

        <TabsContent value="sold" className="p-4 pt-0 mt-0">
          <DropdownMenuSeparator className="mt-0" />
          <h1 className="text-sm font-semibold text-white mb-2">150 من الوحدات المباعة</h1>
          <DropdownMenu>
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
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-A") && 'bg-slate-400')}
                checked={categories.includes("category-A")}
                onCheckedChange={() => toggleType("category-A")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة- A</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-B") && 'bg-slate-400')}
                checked={categories.includes("category-B")}
                onCheckedChange={() => toggleType("category-B")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-C") && 'bg-slate-400')}
                checked={categories.includes("category-C")}
                onCheckedChange={() => toggleType("category-C")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                dir="rtl"
                className={clsx("flex items-center justify-between mb-1 cursor-pointer", categories.includes("category-D") && 'bg-slate-400')}
                checked={categories.includes("category-D")}
                onCheckedChange={() => toggleType("category-D")}
              >
                <span className="block text-base text-slate-500 font-semibold">فئة-A</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsContent>
      </Tabs>

      {/* price Range Slider */}
      <div className="py-2">
        <h1 className="font-bold text-sm text-gray-300 mb-8">
          السعر
          <Badge variant="secondary" className="mx-1">
            ريال سعودي
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
          المساحة
          <Badge variant="secondary" className="mx-1">
            متر مربع
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

      <Button variant="showALl"
        className={clsx("w-full mt-2",
          categories.includes("category-A") &&
          categories.includes("category-B") &&
          categories.includes("category-C") &&
          categories.includes("category-D") &&
          "bg-white text-slate-600"
        )}
        onClick={handleShowAllBtn}>{t("ShowAll")}</Button>
    </div>
  )
}

export default BuildingBlocksFiters;
