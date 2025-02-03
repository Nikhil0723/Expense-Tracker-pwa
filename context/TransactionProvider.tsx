"use client";

import React, { useState } from "react";
import { Transaction, TransactionContext } from "./TransactionContext";
import { v4 as uuidv4 } from "uuid";

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Add Transaction
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions((prev) => [...prev, { id: uuidv4(), ...transaction }]);
  };

  // Delete Transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
  };

  // Edit Transaction
  const editTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
      )
    );
  };

  // Toggle Transaction Completion
  const toggleTransactionCompletion = (id: string) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, completed: !transaction.completed } : transaction
      )
    );
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, editTransaction, toggleTransactionCompletion }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
