'use client'
import { createContext, useContext } from "react";


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
  mainCurrency: string ;
  decimalLength: number;
  NumberFormat: string;
  groups: Group[];
  tags: Tag[];
}

// Define the context type
interface AppSettingsContextType {
  settings: AppSetting;
  updateSetting: <K extends keyof AppSetting>(key: K, value: AppSetting[K]) => void;
  addGroup: (group: Group) => void;
  deleteGroup: (uuid: string) => void;
  addTag: (tag: Tag) => void;
  deleteTag: (uuid: string) => void;
}

// Create the context with default values (undefined)
export const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

// Custom hook to use the context
export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useAppSettings must be used within an AppSettingsProvider");
  }
  return context;
};
