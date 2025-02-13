"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSettings } from "@/context/AppSettingContext";
import { currencies } from "@/lib/currency";

const CurrencySelector = () => {
  const { settings, updateSetting } = useAppSettings();

  return (
    <Select
      value={settings.mainCurrency}
      onValueChange={(value) => updateSetting("mainCurrency", value)}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.iso_code} value={currency.symbol}>
            {currency.name} ({currency.symbol})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
