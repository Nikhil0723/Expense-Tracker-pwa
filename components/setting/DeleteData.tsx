"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, Trash2 } from "lucide-react";

export default function DeleteData() {
  return (
    <>
      {/* Delete Confirmation Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            Erase <ChevronRight />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className=" max-w-md mx-auto rounded-t-3xl px-4 py-8">
          <div className="mt-4 text-center ">
          <Trash2  className=" text-red-600 mx-auto mb-4" size={40}/>
            <h5 className=" text-xl font-semibold">Are you absolute sure</h5>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this tag?
            </p>

            <Button variant="destructive" className=" w-full rounded-lg mt-4">
              Confirm
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
