"use client";

import React, { useState, useEffect } from "react";
import { Transaction, TransactionContext } from "./TransactionContext";
import { v4 as uuidv4 } from "uuid";

// Load transactions from localStorage
const loadTransactions = (): Transaction[] => {
  if (typeof window === "undefined") return []; // Prevent SSR issues
  const storedData = localStorage.getItem("transactions");
  return storedData ? JSON.parse(storedData) : [];
};

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(loadTransactions);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

 
  // Add Transaction
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions((prev) => {
      const newTransactions = [...prev, { id: uuidv4(), ...transaction }];
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      return newTransactions;
    });
  };

  // Delete Transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => {
      const newTransactions = prev.filter(
        (transaction) => transaction.id !== id
      );
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      return newTransactions;
    });
  };

  // Edit Transaction
  const editTransaction = (
    id: string,
    updatedTransaction: Partial<Transaction>
  ) => {
    setTransactions((prev) => {
      const newTransactions = prev.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      );
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      return newTransactions;
    });
  };

  // Toggle Transaction Completion
  const toggleTransactionCompletion = (id: string) => {
    setTransactions((prev) => {
      const newTransactions = prev.map((transaction) =>
        transaction.id === id
          ? { ...transaction, completed: !transaction.completed }
          : transaction
      );
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      return newTransactions;
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
        toggleTransactionCompletion,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
