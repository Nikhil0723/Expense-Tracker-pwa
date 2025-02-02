"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useAppSettings } from "@/context/AppSettingContext";

export function NumberFormatSelect() {
  const { settings, updateSetting } = useAppSettings(); 

  return (
    <Select
      onValueChange={(value) => updateSetting("NumberFormat", value)}  
      value={settings.NumberFormat}
    >
      <SelectTrigger className="w-fit gap-2">
        <SelectValue placeholder="Select Number Format" /> <ChevronDown size={16} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="comma">1,00,000.00</SelectItem>
        <SelectItem value="dot">1.00.000,00</SelectItem>
        <SelectItem value="space">1 00 000.00</SelectItem>
        <SelectItem value="plain">100000.00</SelectItem>
      </SelectContent>
    </Select>
  );
}
