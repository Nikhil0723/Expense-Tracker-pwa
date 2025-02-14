"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Trash2 } from "lucide-react";
import { useAppSettings } from "@/context/AppSettingContext";
import { useTransactions } from "@/context/TransactionContext";

export default function DeleteData() {
  const { setSettings } = useAppSettings();
  const { setTransactions } = useTransactions();

  const handleDelete = () => {
    // Clear localStorage
    localStorage.clear();

    // Reset App Settings to Default
    setSettings({
      language: "en",
      mainCurrency: "$",
      decimalLength: 2,
      NumberFormat: "1,234.56",
      groups: [],
      tags: [
        { uuid: "1", label: "Food", color: "#FF5733" },
        { uuid: "2", label: "Transport", color: "#3498DB" },
        { uuid: "3", label: "Shopping", color: "#9B59B6" },
        { uuid: "4", label: "Entertainment", color: "#F1C40F" },
        { uuid: "5", label: "Health", color: "#2ECC71" },
        { uuid: "6", label: "Bills", color: "#E74C3C" },
      ],
    });

    // Clear All Transactions
    setTransactions([]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Erase <ChevronRight />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-w-md mx-auto rounded-t-3xl px-4 py-8">
        <div className="mt-4 text-center">
          <Trash2 className="text-red-600 mx-auto mb-4" size={40} />
          <h5 className="text-xl font-semibold">Are you absolutely sure?</h5>
          <p className="text-sm text-gray-700">
            This action will delete all your settings and transactions permanently.
          </p>

          <SheetClose className="w-full rounded-lg mt-4 bg-red-600 text-white p-2" onClick={handleDelete}>
            Confirm
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
