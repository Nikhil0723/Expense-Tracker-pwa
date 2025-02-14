"use client";

import React, { useCallback, useEffect, useState } from "react";
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

  // State management
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState(
    settings.mainCurrency ?? currencies[0].symbol
  );
  const [amount, setAmount] = useState("0");
  const [type, setType] = useState<"income" | "expense">("income");
  const [frequency, setFrequency] = useState<
    "onetime" | "Every Month" | "Every 3 Month" | "Every 6 Month" | "Every Year"
  >("onetime");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    if (currency !== settings.mainCurrency) {
      setCurrency(settings.mainCurrency ?? currencies[0].symbol);
    }
  }, [settings.mainCurrency]);

  const handleAmountChange = (value: string) => {
    if (value === "✔") {
      handleSubmit();
      return;
    }
    if (value === "." && !amount.includes(".")) {
      setAmount((prev) => `${prev}${value}`);
      return;
    }
    if (value === "backspace") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      return;
    }
    setAmount((prev) => (prev === "0" ? value : `${prev}${value}`));
  };

  const getFutureDates = (startDate: string, frequency: string) => {
    const futureDates: string[] = [];
    const date = new Date(startDate);

    for (let i = 1; i <= 12; i++) {
      if (frequency === "Every Month") date.setMonth(date.getMonth() + 1);
      else if (frequency === "Every 3 Month")
        date.setMonth(date.getMonth() + 3);
      else if (frequency === "Every 6 Month")
        date.setMonth(date.getMonth() + 6);
      else if (frequency === "Every Year")
        date.setFullYear(date.getFullYear() + 1);
      else break;

      futureDates.push(date.toISOString().split("T")[0]);
    }
    return futureDates;
  };

  const handleSubmit = useCallback(() => {
    const amountNumber = parseFloat(amount);
    if (!title.trim() || isNaN(amountNumber) || !date) {
      alert("Please fill all required fields");
      return;
    }

    const transactions = [
      {
        title: title.trim(),
        amount: amountNumber,
        date,
        type,
        frequency,
        completed: false,
        currency,
        tags: selectedTag ? [selectedTag] : [],
        group:
          settings.groups.find((group) => group.uuid === selectedGroup) || null,
      },
    ];

    if (frequency !== "onetime") {
      const futureDates = getFutureDates(date, frequency);
      futureDates.forEach((futureDate) => {
        transactions.push({
          ...transactions[0],
          date: futureDate,
          completed: false,
        });
      });
    }

    transactions.forEach((tx) => addTransaction(tx));

    // Reset form state
    setTitle("");
    setAmount("0");
    setDate(new Date().toISOString().split("T")[0]);
    setType("income");
    setFrequency("onetime");
    setSelectedTag(null);
    setSelectedGroup(null);
    setCurrency(settings.mainCurrency ?? currencies[0].symbol);
    setOpen(false);
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
    settings.mainCurrency,
    addTransaction,
  ]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        asChild
        className="w-full h-full flex items-center justify-center bg-white hover:bg-slate-50"
      >
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <Plus size={20} />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full max-w-md mx-auto p-4">
        <DrawerHeader className="flex justify-start">
          <DrawerClose>
            <X />
          </DrawerClose>
        </DrawerHeader>

        {/* Amount Section */}
        <div className="h-[150px] flex items-center justify-end gap-4">
          <h1 className="text-6xl font-medium">
            {currency}
            {amount}
          </h1>
          <IoBackspace
            size={24}
            className="cursor-pointer"
            onClick={() =>
              setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))
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
              <SelectTrigger className=" w-fit h-auto p-2.5">
                <SelectValue>{type}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={frequency}
              onValueChange={(value) => setFrequency(value as typeof frequency)}
            >
              <SelectTrigger className="w-32 h-auto p-2.5">
                <SelectValue>{frequency}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="onetime">One Time</SelectItem>
                  <SelectItem value="Every Month">Every Month</SelectItem>
                  <SelectItem value="Every 3 Month">Every 3 Months</SelectItem>
                  <SelectItem value="Every 6 Month">Every 6 Months</SelectItem>
                  <SelectItem value="Every Year">Every Year</SelectItem>
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
                <SelectTrigger className=" w-fit h-auto p-2.5">
                  <SelectValue placeholder="Tags">
                    {selectedTag ? (
                      <div className="flex items-center gap-2">
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
        <div className="mt-2">
          <Numpad onValueChange={handleAmountChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
