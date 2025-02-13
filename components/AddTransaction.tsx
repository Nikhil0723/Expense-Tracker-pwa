"use client";

import React, { useCallback, useState } from "react";
import { IoBackspace } from "react-icons/io5";
import { Plus, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Numpad from "./NumPad";
import { useTransactions } from "@/context/TransactionContext";
import { useRouter } from "next/navigation";
import { useAppSettings } from "@/context/AppSettingContext";
import { currencies } from "@/lib/currency";

interface Tag {
  uuid: string;
  label: string;
  color: string;
}

export default function AddTransaction() {
  const { settings } = useAppSettings();
  const { addTransaction } = useTransactions();
  const router = useRouter();

  // State management
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState<string>(
    settings.mainCurrency ?? currencies[0].symbol
  );
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"income" | "expense">("income");
  const [frequency, setFrequency] = useState<
    "onetime" | "Every Month" | "Every 3 Month" | "Every 6 Month" | "Every Year"
  >("onetime");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleAmountChange = (value: string) => {
    setAmount((prev) => {
      if (value === "✔") {
        if (!title || amount === null || !date) return prev; // Prevent unnecessary calls
        handleSubmit();
        return prev;
      } else if (value === ".") {
        return prev.toString().includes(".") ? prev : parseFloat(prev + ".");
      } else {
        return parseFloat(prev.toString() + value);
      }
    });
  };

  // Handle transaction submission
  const handleSubmit = useCallback(() => {
    if (!title || amount === null || !date) {
      alert("Please fill all fields");
      return;
    }

    // Prevent duplicate submission by setting state once before proceeding
    setOpen(false);

    addTransaction({
      title,
      amount,
      date: date.toISOString().split("T")[0],
      type,
      frequency,
      completed: false,
      currency,
      tags: selectedTag ? [selectedTag] : [],
      group: settings.groups.find((group) => group.uuid === selectedGroup),
    });

    // Reset state after adding
    setTimeout(() => {
      setTitle("");
      setAmount(0);
      setDate(new Date());
      setType("income");
      setFrequency("onetime");
      setSelectedTag(null);
      setSelectedGroup(null);
    }, 300); // Small delay to avoid conflicts
  }, [
    title,
    amount,
    date,
    type,
    frequency,
    currency,
    selectedTag,
    selectedGroup,
    settings.groups,
    addTransaction,
  ]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        asChild
        className="w-full h-full flex items-center justify-center bg-white hover:bg-slate-50"
      >
        <Plus size={20} />
      </DrawerTrigger>

      <DrawerContent className="h-full max-w-md mx-auto">
        <DrawerHeader className="flex justify-start">
          <DrawerClose>
            <X />
          </DrawerClose>
        </DrawerHeader>

        {/* Amount Section */}
        <div className="h-[150px] flex items-center justify-end gap-4 mr-8">
          <h1 className="text-6xl font-medium">
            {currency}
            {amount !== null ? amount : "0"}
          </h1>
          <IoBackspace
            size={24}
            className="cursor-pointer"
            onClick={() =>
              setAmount((prev) => (prev ? Math.floor(prev / 10) : 0))
            }
          />
        </div>

        {/* Transaction Input */}
        <div className="mt-2 mx-2">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-auto py-2.5"
            />

            <Select
              value={currency}
              onValueChange={(value) => setCurrency(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.iso_code} value={currency.symbol}>
                    {currency.name} ({currency.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selection Fields */}
          <div className="flex overflow-x-scroll gap-2 items-center mt-2">
            <Select
              value={type}
              onValueChange={(value) => setType(value as "income" | "expense")}
            >
              <SelectTrigger className="w-16 h-auto p-2.5">
                <SelectValue>{type}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Group Selection */}
            {settings.groups.length > 0 && (
              <Select
                value={selectedGroup ?? ""}
                onValueChange={setSelectedGroup}
              >
                <SelectTrigger className="h-auto p-2.5">
                  <SelectValue placeholder="Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {settings.groups.map((group) => (
                      <SelectItem key={group.uuid} value={group.uuid}>
                        {group.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}

            {/* Single Tag Selection with Color Display */}
            {settings.tags.length > 0 && (
              <Select
                value={selectedTag ? selectedTag.uuid : ""}
                onValueChange={(value) => {
                  const tag = settings.tags.find((t) => t.uuid === value);
                  if (tag) setSelectedTag(tag);
                }}
              >
                <SelectTrigger className="w-28 h-auto p-2.5">
                  <SelectValue placeholder="Tags">
                    {selectedTag ? (
                      <div className="flex items-center gap-1">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: selectedTag.color }}
                        />
                        <span>{selectedTag.label}</span>
                      </div>
                    ) : (
                      "Tags"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {settings.tags.map((tag) => (
                      <SelectItem key={tag.uuid} value={tag.uuid}>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: tag.color }}
                          />
                          {tag.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Number Pad */}
        <div className="mt-2 mx-2">
          <Numpad onValueChange={handleAmountChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
