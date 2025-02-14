"use client";
import React, { useState, useCallback } from "react";
import MonthSlider from "@/components/MonthSlider";
import TransactionTab from "@/components/TransactionTab";
import TotalAmount from "@/components/TotalAmout";

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Use useCallback to prevent unnecessary re-renders
  const handleMonthChange = useCallback((month: Date) => {
    setSelectedMonth(month);
  }, []);

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col">
      {/* Month Slider */}
      <MonthSlider onMonthChange={handleMonthChange} />

      {/* Total Amount */}
      <TotalAmount selectedMonth={selectedMonth} />

      {/* Transaction Tabs */}
      <TransactionTab selectedMonth={selectedMonth} />
    </div>
  );
}
