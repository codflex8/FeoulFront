"use client";

import React, { useState } from 'react'
import { categoriesColumns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { FaPlus } from "react-icons/fa6";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddCategoryForm from '@/components/form/AddCategoryForm';
import { categoriesData } from '@/dummyData';


const page = () => {
  const [openCategory, setOpenCategory] = useState<boolean>(false)
  return (
    <div className="min-h-screen bg-gray-100 flex-1 p-6">
      <Button onClick={() => setOpenCategory(true)} className="mb-4 bg-slate-600 hover:bg-slate-700 text-white">
        إضافة فئة
        <FaPlus />
      </Button>

      <Dialog open={openCategory} onOpenChange={setOpenCategory}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-xl font-extrabold">
              إضافة فئة
            </DialogTitle>
          </DialogHeader>
          <AddCategoryForm setOpen={setOpenCategory} />
        </DialogContent>
      </Dialog>

      {/* Table Section */}
      <DataTable page="categories" columns={categoriesColumns} data={categoriesData} />
    </div>
  )
}

export default page
