import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/context/TransactionContext";
import { useAppSettings } from "@/context/AppSettingContext";

const TotalAmount = ({ selectedMonth }: { selectedMonth: Date }) => {
  const { transactions } = useTransactions();
  const { settings } = useAppSettings();

  // State to track the selected calculation mode
  const [calculationMode, setCalculationMode] = React.useState<
    "actual" | "forsight" | "hidden"
  >("forsight");

  // Helper function to check if a transaction belongs to the selected month
  const isTransactionInSelectedMonth = (transactionDate: string) => {
    const transactionMonth = new Date(transactionDate).getMonth();
    const transactionYear = new Date(transactionDate).getFullYear();
    return (
      transactionMonth === selectedMonth.getMonth() &&
      transactionYear === selectedMonth.getFullYear()
    );
  };

  // Calculate total income and expense based on the calculation mode
  const calculateTotal = (type: "income" | "expense") => {
    let filteredTransactions = transactions.filter(
      (t) => t.type === type && isTransactionInSelectedMonth(t.date)
    );

    if (calculationMode === "actual") {
      filteredTransactions = filteredTransactions.filter((t) => t.completed);
    }

    return filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  };

  // Get totals for income and expense
  const totalIncome = calculateTotal("income");
  const totalExpense = calculateTotal("expense");

  // Net balance (income - expense)
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="text-center text-4xl font-bold relative">
      {/* Display the total amount */}
      {calculationMode === "hidden" ? (
        <h1>*****</h1>
      ) : (
        <h1>
          {settings.mainCurrency} {netBalance.toFixed(settings.decimalLength)}
        </h1>
      )}

      {/* Popover Trigger */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0"
          >
            ⋮ {/* Ellipsis icon for the popover trigger */}
          </Button>
        </PopoverTrigger>

        {/* Popover Content */}
        <PopoverContent className="w-48 p-2">
          <div className="flex flex-col gap-2">
          <Button
              variant={calculationMode === "forsight" ? "default" : "ghost"}
              onClick={() => setCalculationMode("forsight")}
            >
              Forsight
            </Button>
            {/* Option: Actual */}
            <Button
              variant={calculationMode === "actual" ? "default" : "ghost"}
              onClick={() => setCalculationMode("actual")}
            >
              Actual
            </Button>

            {/* Option: Forsight */}
          

            {/* Option: Hidden */}
            <Button
              variant={calculationMode === "hidden" ? "default" : "ghost"}
              onClick={() => setCalculationMode("hidden")}
            >
              Hidden
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TotalAmount;
