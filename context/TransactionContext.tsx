"use client";

import { createContext, useContext } from "react";

// Define Transaction Type
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  frequency: "onetime" | "Every Month" | "Every 3 Month" | "Every 6 Month"  | "Every Year";
  completed: boolean;
}

// Define Context Type
export interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, updatedTransaction: Partial<Transaction>) => void;
  toggleTransactionCompletion: (id: string) => void;
}

// Create Context
export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Custom Hook to Use Transaction Context
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};
