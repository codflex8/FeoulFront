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
import { FaChevronDown } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function DropdownMenuCheckboxes() {
  const [showPublished, setShowPublished] = useState<Checked>(true)
  const [showUnpublished, setShowUnpublished] = useState<Checked>(false)
  const [showDeleted, setShowDeleted] = useState<Checked>(false)

  const cities = ["خانيونس", "غزة", "رفح"]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[150px] felx items-center justify-between">
          <span>حالة المشروع</span>
          <FaChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={showPublished}
          onCheckedChange={setShowPublished}
        >
          منشور
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showUnpublished}
          onCheckedChange={setShowUnpublished}
        >
          مسودة
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showDeleted}
          onCheckedChange={setShowDeleted}
        >
          محذوف
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


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

  return (
    <div className="flex-1">
      <div className="my-4 flex items-center justify-start gap-8">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("projectName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("projectName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        
        <DropdownMenuCheckboxes />
        <DropdownMenuCheckboxes />

        <Button className="bg-slate-500 hover:bg-slate-600 text-white">إعادة ضبط</Button>
      </div>

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
