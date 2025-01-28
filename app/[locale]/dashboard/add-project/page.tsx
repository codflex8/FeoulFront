"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import 'react-phone-number-input/style.css'
import { Button } from "@/components/ui/button"
import "leaflet/dist/leaflet.css";
import { addProject } from "@/lib/actions/dashboard.actions";  

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";

import { Input } from "@/components/ui/input"
import FileUploader from "@/components/dashboard/fileUploader"

 
const MapMarker = ({ onLocationChange }: { onLocationChange: (lng: string, lnt: string) => void }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);  
      onLocationChange(lng.toString(), lat.toString()); 
    },
  });

  return position ? <Marker position={position}></Marker> : null;
};

const projectFormSchema = z.object({
  number: z.string({
    required_error: "رقم المشروع مطلوب",
  }).min(2, {
    message: "رقم المشروع يجب ألا يقل عن حرفين",
  }),
  name: z.string({
    required_error: "إسم المشروع مطلوب",
  }).min(2, {
    message: "إسم المشروع يجب ألا يقل عن 5 أحرف",
  }),
  city: z.enum(["جدة", "الرياض", "المدينة المنورة"], {
    required_error: "المدينة حقل مطلوب",
  }),
  status: z.enum(["posted", "draft", "deleted"], {
    required_error: "حالة المشروع حقل مطلوب",
  }),
  buildingsNumber: z.string({
    required_error: "عدد الوحدات السكنية حقل مطلوب"
  }),
  design: z.instanceof(File).array().nonempty({
    required_error: "نموذج المشروع حقل مطلوب"
  }),
  lng: z.string({
    required_error: "موقع المشروع حقل مطلوب",
  }),
  lat: z.string({
    required_error: "موقع المشروع حقل مطلوب",
  })
})

const page = () => {

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      number: "",
      name: "",
      city: "جدة",
      status: "مسودة",
      lng: "",
      lat: "",
    },
  })

  const onSubmit =  async  (values: z.infer<typeof projectFormSchema>) => {
      try {
        await addProject(values);
       } catch (error) {
        console.error("Failed to add category:", error);
      }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 gap-y-8 grid-cols-2 w-full">
        

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="min-w-[250px]">
                <FormLabel className="text-base font-semibold">رقم المشروع</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="005" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="min-w-[250px]">
                <FormLabel className="text-base font-semibold">اسم المشروع</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="سراة من فيول" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">المدينة</FormLabel>
                <Select dir="rtl" onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="bg-white">
                    <SelectTrigger>
                      <SelectValue placeholder="جدة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white ">
                    {["جدة", "الرياض", "المدينة المنورة"].map((item, i) => (
                      <SelectItem key={item + i} value={item} >
                        <div className="flex items-center gap-2 cursor-pointer">
                          <p>{item}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">حالة المشورع</FormLabel>
                <Select dir="rtl" onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="bg-white">
                    <SelectTrigger>
                      <SelectValue placeholder="منشور" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {["posted", "draft", "deleted"].map((item, i) => (
                      <SelectItem key={item + i} value={item}>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <p>{item}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buildingsNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">عدد الوحدات السكنية</FormLabel>
                <FormControl>
                  <Input className="bg-white" type="number" placeholder="150" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <FormField
            control={form.control}
            name="lng"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">خط الطول</FormLabel>
                <FormControl>
                  <input
                    className="bg-white border p-2 rounded"
                    {...field}
                    readOnly  
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lat"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">خط العرض</FormLabel>
                <FormControl>
                  <input
                    className="bg-white border p-2 rounded"
                    {...field}
                    readOnly  
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <div className="mb-4">
              <p className="text-base font-semibold">حدد موقع المشروع على الخريطة</p>
            </div>
            <MapContainer
              center={[21.5, 39.2]}  
              zoom={12}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapMarker
                onLocationChange={(lng, lnt) => {
                  form.setValue("lng", lng); 
                  form.setValue("lnt", lnt); 
                }}
              />
            </MapContainer>
          </div>
        

          <FormField
            control={form.control}
            name="design"
            render={({ field }) => (
              <FormItem className="col-span-2 ">
                <FormLabel className="text-base font-semibold">نموذج المشروع</FormLabel>
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="block w-full col-span-2 transition-all bg-green-600 hover:bg-green-500 text-lg h-fit" type="submit">إضافة المشروع</Button>
        </form>
      </Form>
    </div>
  )
}

export default page;