"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function NumberFormatSelect() {
  const [format, setFormat] = React.useState("comma"); // Default format

  return (
    <Select onValueChange={setFormat} value={format}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select Number Format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="comma">1,000.00 (Comma Separator)</SelectItem>
        <SelectItem value="dot">1.000,00 (Dot Separator)</SelectItem>
        <SelectItem value="space">1 000.00 (Space Separator)</SelectItem>
        <SelectItem value="plain">1000.00 (No Separator)</SelectItem>
      </SelectContent>
    </Select>
  );
}
