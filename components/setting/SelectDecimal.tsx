"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useAppSettings } from "@/context/AppSettingContext";

// Utility function to validate and fallback locale
const isValidLocale = (locale: string): boolean => {
  try {
    new Intl.NumberFormat(locale);
    return true;
  } catch {
    return false;
  }
};

const getValidLocale = (locale: string | undefined): string => {
  const defaultLocale = "en-US"; // Default fallback locale
  if (!locale || !isValidLocale(locale)) {
    return defaultLocale;
  }
  return locale;
};

const Counter = () => {
  const { settings, updateSetting } = useAppSettings();
  const [count, setCount] = React.useState<number>(settings.decimalLength);

  // Ensure the locale is valid
  const validLocale = getValidLocale(settings.NumberFormat);

  // Function to handle the increase
  const increase = () => {
    if (count < 8) {
      setCount(count + 1);
    }
  };

  // Function to handle the decrease
  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  React.useEffect(() => {
    updateSetting("decimalLength", count);
  }, [count]);

  return (
    <div className="flex items-center space-x-4">
      {/* Decrease Button */}
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 rounded-lg"
        onClick={decrease}
      >
        <Minus className="h-3 w-3" />
      </Button>
      {/* Number Display */}
      <div className="w-6 text-center text-base">{count}</div>
      {/* Increase Button */}
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 rounded-lg"
        onClick={increase}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default Counter;