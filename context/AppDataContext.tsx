import { createContext, useContext, useState } from "react";

interface group {
  uuid: string;
  name: string;
}
interface tag {
  uuid: string;
  name: string;
  color: string;
}

interface AppSetting {
  language: string;
  mainCurrency: string;
  decimalLength: number;
  NumberFormat: string;
  groups: group[];
  tags: tag[];
}
