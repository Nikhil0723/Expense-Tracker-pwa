'use client';
import React from "react";
import { Checkbox } from "./ui/checkbox";
import { EllipsisVertical } from "lucide-react";
import { Transaction, useTransactions } from "@/context/TransactionContext";

interface TransactionCardProps {
  transaction: Transaction; // Use the Transaction interface from your context
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const { toggleTransactionCompletion } = useTransactions();

  return (
    <div className="flex items-center justify-between border-b">
      {/* Left Side: Checkbox and Details */}
      <div className="flex">
        <div className="p-4 border-r">
          <Checkbox
            className="h-6 w-6 m-0 p-0 outline-none"
            checked={transaction.completed}
            onCheckedChange={() => toggleTransactionCompletion(transaction.id)}
          />
        </div>
        <div className="ml-2 flex flex-col items-start justify-center gap-1 text-left">
          <h5 className="text-sm font-semibold">{transaction.title}</h5>
          <p className="text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Right Side: Amount and Menu Icon */}
      <div className="flex items-center gap-2">
        <p className={`text-base ${transaction.type === "expense" ? "text-red-500" : "text-green-500"}`}>
          {transaction.type === "expense" ? `- $${transaction.amount}` : `+ $${transaction.amount}`}
        </p>
        <EllipsisVertical size={18} />
      </div>
    </div>
  );
};

export default TransactionCard;