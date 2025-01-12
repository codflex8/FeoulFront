"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useState } from "react"
import { Button } from "../ui/button"
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cityOptions, statusOptions } from "@/constants";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  page?: string
}


export function DataTable<TData, TValue>({
  columns,
  data,
  page
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [date, setDate] = useState<Date | string>("")

  const handleCityOption = (value: string) => {
    setSelectedCity(value)
    table.getColumn("city")?.setFilterValue(value)
  }

  const handleStatusOption = (value: string) => {
    setSelectedStatus(value)
    table.getColumn("status")?.setFilterValue(value)
  }

  const handleDateFilter = (value: Date | string) => {
    setDate(value)
    const formattedDate = new Date(value).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    table.getColumn("date")?.setFilterValue(formattedDate)
  }

  const clearAll = () => {
    setSelectedCity("")
    setSelectedStatus("")
    setDate("")
  }

  return (
    <div className="flex-1">

      {/* Projects Filter Section */}
      {(page === "projects") && (
        <div className="my-4 flex items-center justify-start gap-8">

          {/* Cities Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[150px] flex items-center justify-between">
                <span>{cityOptions.find((option) => option.label === selectedCity)?.label || 'المدينة'}</span>
                <FaChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuRadioGroup value={selectedCity} onValueChange={setSelectedCity}>
                {cityOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.id}
                    value={option.label}
                    onSelect={() => handleCityOption(option.label)}
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[150px] flex items-center justify-between">
                <span>{statusOptions.find((option) => option.label === selectedStatus)?.label || 'حالة المشروع'}</span>
                <FaChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuRadioGroup value={selectedStatus} onValueChange={setSelectedStatus}>
                {statusOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.id}
                    value={option.label}
                    onSelect={() => handleStatusOption(option.label)}
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* DatePicker Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span className="text-black">تاريخ الإضافة</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(date)}
                onSelect={(value) => handleDateFilter(value)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button onClick={() => clearAll()} className="bg-slate-500 hover:bg-slate-600 text-white">إعادة ضبط</Button>
        </div>
      )}

      <div className="rounded-md border overflow-x-auto">
        <Table className="bg-white min-w-full">
          <TableHeader className="bg-zinc-500 !hover:bg-zinc-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white ">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  لا يوجد نتائج
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!page && (
        <div className="flex items-center justify-strat !space-x-4 py-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
          </Button>
        </div>
      )}
    </div>
  )
}
