"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CurrencySelect() {
  const [currency, setCurrency] = React.useState("usd"); // Default currency

  return (
    <Select onValueChange={setCurrency} value={currency}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="usd">🇺🇸 USD - US Dollar</SelectItem>
        <SelectItem value="eur">🇪🇺 EUR - Euro</SelectItem>
        <SelectItem value="gbp">🇬🇧 GBP - British Pound</SelectItem>
        <SelectItem value="inr">🇮🇳 INR - Indian Rupee</SelectItem>
        <SelectItem value="jpy">🇯🇵 JPY - Japanese Yen</SelectItem>
        <SelectItem value="cny">🇨🇳 CNY - Chinese Yuan</SelectItem>
      </SelectContent>
    </Select>
  );
}
