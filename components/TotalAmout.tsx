import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/context/TransactionContext";
import { useAppSettings } from "@/context/AppSettingContext";
import { Info, EyeOff, CheckCircle, Clock } from "lucide-react";

const TotalAmount = ({ selectedMonth }: { selectedMonth: Date }) => {
  const { transactions } = useTransactions();
  const { settings } = useAppSettings();

  const [calculationMode, setCalculationMode] = React.useState<
    "actual" | "forsight" | "hidden"
  >("forsight");

  const isTransactionInSelectedMonth = (transactionDate: string) => {
    const transactionMonth = new Date(transactionDate).getMonth();
    const transactionYear = new Date(transactionDate).getFullYear();
    return (
      transactionMonth === selectedMonth.getMonth() &&
      transactionYear === selectedMonth.getFullYear()
    );
  };

  const calculateTotal = (type: "income" | "expense") => {
    let filteredTransactions = transactions.filter(
      (t) => t.type === type && isTransactionInSelectedMonth(t.date)
    );
    if (calculationMode === "actual") {
      filteredTransactions = filteredTransactions.filter((t) => t.completed);
    }
    return filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  };

  const totalIncome = calculateTotal("income");
  const totalExpense = calculateTotal("expense");

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="text-center relative">
      <div className="flex items-center justify-center gap-2 mb-2">
        <h2 className="text-lg font-semibold">Net Balance</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Info className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700" />
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <p className="text-sm text-gray-600">
              This shows your net balance for the selected month. You can switch
              between different calculation modes using the options below.
            </p>
          </PopoverContent>
        </Popover>
      </div>

      {/* Display the total amount */}
      <div className="text-4xl font-bold mb-4">
        {calculationMode === "hidden" ? (
          <h1 className="text-gray-400">*****</h1>
        ) : (
          <h1>
            {settings.mainCurrency} {netBalance.toFixed(settings.decimalLength)}
          </h1>
        )}
      </div>

      <div className="flex justify-center gap-8 text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>
            Income: {settings.mainCurrency}{" "}
            {totalIncome.toFixed(settings.decimalLength)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-red-500" />
          <span>
            Expense: {settings.mainCurrency}{" "}
            {totalExpense.toFixed(settings.decimalLength)}
          </span>
        </div>
      </div>

      {/* Popover Trigger Below Total Amount */}
      <div className="flex justify-center mb-2">
        <Popover>
          <PopoverTrigger asChild > 
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 px-4 py-2 text-sm"
            >
              <span>
                {calculationMode.charAt(0).toUpperCase() +
                  calculationMode.slice(1)}
              </span>
              <Clock className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          {/* Popover Content */}
          <PopoverContent className="w-40 p-2">
            <div className="flex flex-col gap-2">
              <Button
                variant={calculationMode === "forsight" ? "default" : "ghost"}
                onClick={() => setCalculationMode("forsight")}
                className="flex items-center justify-start gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>Forsight</span>
              </Button>

              <Button
                variant={calculationMode === "actual" ? "default" : "ghost"}
                onClick={() => setCalculationMode("actual")}
                className="flex items-center justify-start gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Actual</span>
              </Button>

              <Button
                variant={calculationMode === "hidden" ? "default" : "ghost"}
                onClick={() => setCalculationMode("hidden")}
                className="flex items-center justify-start gap-2"
              >
                <EyeOff className="w-4 h-4" />
                <span>Hidden</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TotalAmount;
