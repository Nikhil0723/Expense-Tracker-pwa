import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter } from "lucide-react";
import { Button } from "./ui/button";
import TransactionCard from "./TransactionCard";
import { ScrollArea } from "./ui/scroll-area";
import { useTransactions } from "@/context/TransactionContext";

interface TransactionTabProps {
  selectedMonth: Date; // The currently selected month
}

export default function TransactionTab({ selectedMonth }: TransactionTabProps) {
  const { transactions } = useTransactions();

  // Helper function to check if a transaction belongs to the selected month
  const isTransactionInSelectedMonth = (transactionDate: string) => {
    const transactionMonth = new Date(transactionDate).getMonth();
    const transactionYear = new Date(transactionDate).getFullYear();
    return (
      transactionMonth === selectedMonth.getMonth() &&
      transactionYear === selectedMonth.getFullYear()
    );
  };

  // Filter transactions by type and selected month
  const incomeTransactions = transactions.filter(
    (t) => t.type === "income" && isTransactionInSelectedMonth(t.date)
  );
  const expenseTransactions = transactions.filter(
    (t) => t.type === "expense" && isTransactionInSelectedMonth(t.date)
  );

  return (
    <Tabs defaultValue="income" className="w-full mt-5 p-3">
      <div className="flex">
        <TabsList className="flex-1 grid w-full grid-cols-2">
          <TabsTrigger value="income" className="flex-1">
            Income
          </TabsTrigger>
          <TabsTrigger value="expense" className="flex-1">
            Expense
          </TabsTrigger>
        </TabsList>
        {transactions.length > 0  && (
          <Button
            variant="outline"
            size="icon"
            className="ml-2 h-auto w-auto p-5"
          >
            <ListFilter />
          </Button>
        )}
      </div>

      {/* Income Tab */}
      <TabsContent value="income" className="p-0 m-0 h-full">
        <ScrollArea className="h-[350px] w-full rounded-md">
          {incomeTransactions.length > 0 ? (
            incomeTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No income transactions
            </p>
          )}
        </ScrollArea>
      </TabsContent>

      {/* Expense Tab */}
      <TabsContent value="expense" className="p-0 m-0 h-full">
        <ScrollArea className="h-[300px] w-full rounded-md">
          {expenseTransactions.length > 0 ? (
            expenseTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No expense transactions
            </p>
          )}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
