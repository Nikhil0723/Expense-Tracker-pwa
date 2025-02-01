"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export function LanguageSelect() {
  const [language, setLanguage] = React.useState("en"); // Default language

  return (
    <Select onValueChange={setLanguage} value={language}>
      <SelectTrigger className=" w-fit gap-2">
        <SelectValue placeholder="Select language" /> <ChevronDown size={16}/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">🇬🇧 English</SelectItem>
        <SelectItem value="es">🇪🇸 Español</SelectItem>
        <SelectItem value="fr">🇫🇷 Français</SelectItem>
        <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
        <SelectItem value="zh">🇨🇳 中文</SelectItem>
      </SelectContent>
    </Select>
  );
}
