"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/core'
import { Button } from "@/components/ui/button"
import { addInterest } from "@/lib/actions/map.actions"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../ui/select";

import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

const formSchema = z.object({
  firstName: z.string({
    required_error: "First name is required.",
  }).min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string({
    required_error: "Second name is required.",
  }).min(2, {
    message: "Second name must be at least 2 characters.",
  }),
  phoneNumber: z
    .string({
      required_error: "phoneNumber number is required.",
    })
    .min(10, {
      message: "phoneNumber number must be at least 10 digits.",
    })
    .max(15, {
      message: "phoneNumber number must be at most 15 digits.",
    }),
  area: z.enum(["central", "eastern", "western"], {
    required_error: "area is required.",
  }),
  unitId: z.string()
})

const InterestedForm = ({ setOpen, unitId }: { setOpen: (open: boolean) => void; unitId: string }) => {
  const t = useTranslations('BuildingViewPage');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      area: "central",
      unitId, // تأكد من تسجيل unitId كقيمة افتراضية
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
  
    try {
      await addInterest(values);
      setOpen(false);
      alert("تم إرسال اهتمامك بنجاح!");
    } catch (error: any) {
      console.error("Error during submission:", error);
      alert(`حدث خطأ أثناء إرسال اهتمامك: ${error.message || "يرجى المحاولة مرة أخرى."}`);
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* تسجيل الحقل المخفي unitId */}
        <input type="hidden" {...form.register("unitId")} value={unitId} />

        <div className="grid gap-4 gap-y-8 grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("FirstName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("FirstNamePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("SurName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("SurNamePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{t("phoneNumber")}</FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="SA"
                    placeholder="52356222"
                    international
                    withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange}
                    style={{ direction: t("language").toLowerCase() === "en" ? "rtl" : "ltr" }}
                    className="!mt-2 h-9 !rounded-md !px-3 !text-sm !border !bg-dark-400 !placeholder:text-dark-600 !border-dark-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Area")}</FormLabel>
                <Select dir="rtl" onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Area")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="shad-select-content">
                    {["central", "eastern", "western"].map((dir, i) => (
                      <SelectItem key={dir + i} value={dir}>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <p>{dir}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="block w-full col-span-2 transition-all bg-green-600 hover:bg-green-500 text-lg h-fit"
            type="submit"
          >
            إرسال
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InterestedForm;

 