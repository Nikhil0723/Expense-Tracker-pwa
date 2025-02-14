"use client";
import { useState, ReactNode, useEffect } from "react";
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

const LOCAL_STORAGE_KEY = "appSettings";

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSetting>(() => {
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedSettings ? JSON.parse(storedSettings) : getDefaultSettings();
    }
    return getDefaultSettings();
  });

  // Load default settings
  function getDefaultSettings(): AppSetting {
    return {
      language: "en",
      mainCurrency: "$",
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
    };
  }

  // Update localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);
  // Update a single setting dynamically
  const updateSetting = (
    key: keyof AppSetting,
    value: string | number | Group[] | Tag[] | undefined
  ) => {
    setSettings((prev) => {
      if (prev[key] === value) return prev; // Prevent unnecessary updates
      return { ...prev, [key]: value };
    });
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
        setSettings,
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
