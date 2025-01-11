"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/core'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"


import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

const formSchema = z.object({
  name: z.string({
    required_error: "Your name is required.",
  }).min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .max(15, {
      message: "Phone number must be at most 15 digits.",
    }),
  message: z
    .string({ required_error: "Message is required.", })
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be no longer than 500 characters.")

})

const NeedHelpForm = ({ setOpen }: React.ComponentState) => {
  const t = useTranslations('BuildingViewPage');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: ""
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 grid-cols-1">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("NamePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{t("Phone")}</FormLabel>
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Message")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("MessagePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="block w-full  transition-all bg-green-600 hover:bg-green-500 text-lg h-fit" type="submit">إرسال</Button>
      </form>
    </Form>
  )
}

export default NeedHelpForm;