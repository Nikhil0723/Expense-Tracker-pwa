"use client";

import React, { useState } from "react";
import { IoBackspace } from "react-icons/io5";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { DatePicker } from "./DatePicker";
import Numpad from "./NumPad";
import { useTransactions } from "@/context/TransactionContext";

export default function AddTransaction() {
  const { addTransaction } = useTransactions();

  // State management
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [type, setType] = useState<"income" | "expense">("income");
  const [frequency, setFrequency] = useState<
    "onetime" | "Every Month" | "Every 3 Month" | "Every 6 Month" | "Every Year"
  >("onetime");
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Handle Numpad input
  const handleAmountChange = (value: string) => {
    if (value === "✔") {
      handleSubmit();
    } else if (value === ".") {
      if (amount !== null && !amount.toString().includes(".")) {
        setAmount(Number(amount + "."));
      }
    } else {
      setAmount((prev) =>
        prev !== null ? Number(prev.toString() + value) : Number(value)
      );
    }
  };

  // Handle transaction submission
  const handleSubmit = () => {
    if (!title || amount === null || !date) {
      alert("Please fill all fields");
      return;
    }

    addTransaction({
      title,
      amount,
      date: date.toISOString().split("T")[0], // Convert date to YYYY-MM-DD
      type,
      frequency,
      completed: false,
    });

    // Reset state after adding
    setTitle("");
    setAmount(null);
    setDate(new Date());
    setType("income");
    setFrequency("onetime");
  };

  return (
    <Drawer>
      <DrawerTrigger
        asChild
        className="w-full h-full flex items-center justify-center bg-white hover:bg-slate-50"
      >
        <Button variant="outline">
          <Plus size={28} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-full max-w-md mx-auto">
        <DrawerHeader className="flex justify-start">
          <DrawerClose>
            <Button variant="ghost">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        {/* Amount Section */}
        <div className="h-[150px] flex items-center justify-end gap-4 mr-8">
          <h1 className="text-6xl font-medium">
            ${amount !== null ? amount : "0"}
          </h1>
          <IoBackspace
            size={24}
            className="cursor-pointer"
            onClick={() =>
              setAmount((prev) => (prev ? Math.floor(prev / 10) : null))
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

            {/* Transaction Type */}
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
          </div>

          {/* Selection Fields */}
          <div className="flex overflow-x-scroll gap-2 items-center mt-2">
            <Select
              value={frequency}
              onValueChange={(value) =>
                setFrequency(
                  value as
                    | "onetime"
                    | "Every Month"
                    | "Every 3 Month"
                    | "Every 6 Month"
                    | "Every Year"
                )
              }
            >
              <SelectTrigger className="w-fit h-auto py-2 px-3 text-base font-medium outline-none bg-black text-white">
                <SelectValue>{frequency}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="onetime">One time</SelectItem>
                  <SelectItem value="Every Month">Every Month</SelectItem>
                  <SelectItem value="Every 3 Month">Every 3 Months</SelectItem>
                  <SelectItem value="Every 6 Month">Every 6 Months</SelectItem>
                  <SelectItem value="Every Year">Every Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Date Picker */}
            <DatePicker selectedDate={date} onChange={setDate} />
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
