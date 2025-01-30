"use client";

import React, { createContext, useContext, useState } from "react";

// Define the context type
interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Create Context
const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Provider Component
export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => Math.min(prev + 1, 8));
  const decrement = () => setCount((prev) => Math.max(prev - 1, 0));

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};

// Custom Hook for using Counter Context
export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) throw new Error("useCounter must be used within a CounterProvider");
  return context;
};
