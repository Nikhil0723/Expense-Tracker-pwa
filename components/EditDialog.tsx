import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transaction } from "@/context/TransactionContext";

interface EditTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  onSave: (updatedTransaction: Partial<Transaction>) => void;
}

export default function EditTransactionDialog({
  isOpen,
  onClose,
  transaction,
  onSave,
}: EditTransactionDialogProps) {
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);

  const handleSave = () => {
    onSave({ title, amount });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
