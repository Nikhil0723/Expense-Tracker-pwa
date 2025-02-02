"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useAppSettings } from "@/context/AppSettingContext";

export function CurrencySelect() {
  const { settings, updateSetting } = useAppSettings();

  // Currency options (symbol mapping)
  const currencyOptions = [
    { value: "$", label: "US Dollar" },
    { value: "€", label: "Euro" },
    { value: "£", label: "British Pound" },
    { value: "₹", label: "Indian Rupee" },
    { value: "¥", label: "Japanese Yen" },
    { value: "¥", label: "Chinese Yuan" },
  ];

  return (
    <Select
      onValueChange={(value) => updateSetting("mainCurrency", value)}
      value={settings.mainCurrency}
    >
      <SelectTrigger className="w-fit gap-2">
        <SelectValue placeholder="Select currency" /> <ChevronDown size={16} />
      </SelectTrigger>
      <SelectContent>
        {currencyOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
