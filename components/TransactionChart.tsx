"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactions } from "@/context/TransactionContext";

const currentYear = new Date().getFullYear();

// Generate an empty dataset for all 12 months
const generateEmptyChartData = () =>
  Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("en-US", { month: "long" }),
    income: 0, // ✅ Rename 'mobile' to 'income'
    expense: 0, // ✅ Rename 'desktop' to 'expense'
  }));

export default function TransactionChart() {
  const { transactions } = useTransactions();

  // Filter transactions for the ongoing year
  const yearlyTransactions = transactions.filter(
    (t) => new Date(t.date).getFullYear() === currentYear
  );

  // Aggregate transactions by month
  const chartData = yearlyTransactions.reduce((acc, transaction) => {
    const monthIndex = new Date(transaction.date).getMonth(); // 0-based index (Jan = 0)
    if (transaction.type === "income") {
      acc[monthIndex].income += transaction.amount; // ✅ Assign correctly
    } else if (transaction.type === "expense") {
      acc[monthIndex].expense += transaction.amount; // ✅ Assign correctly
    }
    return acc;
  }, generateEmptyChartData());

  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--chart-2))", // ✅ Set the correct color for Income
    },
    expense: {
      label: "Expense",
      color: "hsl(var(--chart-1))", // ✅ Set the correct color for Expense
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />

        {/* Hide X-Axis Labels */}
        <XAxis dataKey="month" tick={false} axisLine={false} />

        {/* Tooltip for showing month and values */}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />

        <Area
          dataKey="income" // ✅ Now correct
          type="monotone"
          fill="var(--color-income)" // ✅ Should match Income color
          fillOpacity={0.4}
          stroke="var(--color-income)"
          stackId="a"
        />
        <Area
          dataKey="expense" // ✅ Now correct
          type="monotone"
          fill="var(--color-expense)" // ✅ Should match Expense color
          fillOpacity={0.4}
          stroke="var(--color-expense)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
