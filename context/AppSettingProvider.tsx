"use client";
import { useState, ReactNode } from "react";
import { AppSettingsContext } from "./AppSettingContext";

// Define Group & Tag interfaces
interface Group {
  uuid: string;
  label: string;
}

interface Tag {
  uuid: string;
  label: string;
  color: string;
}

// Define AppSetting interface
interface AppSetting {
  language: string;
  mainCurrency: string;
  decimalLength: number;
  NumberFormat: string;
  groups: Group[];
  tags: Tag[];
}

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSetting>({
    language: "en",
    mainCurrency: "USD",
    decimalLength: 2,
    NumberFormat: "1,234.56",
    groups: [],
    tags: [
      { uuid: "1", label: "Food", color: "#FF5733" },
      { uuid: "2", label: "Transport", color: "#3498DB" },
      { uuid: "3", label: "Shopping", color: "#9B59B6" },
      { uuid: "4", label: "Entertainment", color: "#F1C40F" },
      { uuid: "5", label: "Health", color: "#2ECC71" },
      { uuid: "6", label: "Bills", color: "#E74C3C" },
    ],
  });

  // Update a single setting dynamically
  const updateSetting = <K extends keyof AppSetting>(
    key: K,
    value: AppSetting[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Group Management
  const addGroup = (group: Group) => {
    setSettings((prev) => ({ ...prev, groups: [...prev.groups, group] }));
  };

  const deleteGroup = (uuid: string) => {
    setSettings((prev) => ({
      ...prev,
      groups: prev.groups.filter((group) => group.uuid !== uuid),
    }));
  };

  // Tag Management
  const addTag = (tag: Tag) => {
    setSettings((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  };

  const deleteTag = (uuid: string) => {
    setSettings((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.uuid !== uuid),
    }));
  };

  return (
    <AppSettingsContext.Provider
      value={{
        settings,
        updateSetting,
        addGroup,
        deleteGroup,
        addTag,
        deleteTag,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
