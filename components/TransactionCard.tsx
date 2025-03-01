import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Transaction, useTransactions } from "@/context/TransactionContext";
import TransactionOptionsPopover from "./TransactionOptions";
import EditTransactionDialog from "./EditDialog";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const { toggleTransactionCompletion, editTransaction, deleteTransaction } =
    useTransactions();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleSaveEdit = (updatedTransaction: Partial<Transaction>) => {
    editTransaction(transaction.id, updatedTransaction);
    setIsEditOpen(false);
  };

  return (
    <div className="flex items-center justify-between border-b p-4">
      {/* Left Side: Checkbox & Transaction Details */}
      <div className="flex items-center gap-4">
        <Checkbox
          className="h-6 w-6 m-0 p-0"
          checked={transaction.completed}
          onCheckedChange={() => toggleTransactionCompletion(transaction.id)}
        />
        <div className="flex flex-col">
          <h5 className="text-sm font-semibold">{transaction.title}</h5>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <p>
              {new Date(transaction.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </p>

            {/* Show tag safely */}
            {transaction.tags?.length ? (
              <div className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: transaction.tags[0].color }}
                />
                <span>{transaction.tags[0].label}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Right Side: Amount & Options Menu */}
      <div className="flex items-center gap-2">
        <p
          className={`text-base ${
            transaction.type === "expense" ? "text-red-500" : "text-green-500"
          }`}
        >
          {transaction.currency}
          {transaction.amount}
        </p>
        <TransactionOptionsPopover
          onEdit={handleEdit}
          onDelete={() => deleteTransaction(transaction.id)}
        />
      </div>

      {/* Edit Transaction Dialog */}
      <EditTransactionDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        transaction={transaction}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default TransactionCard;
