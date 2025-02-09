"use client";
import React, { useState } from "react";
import MonthSlider from "@/components/MonthSlider";
import TransactionTab from "@/components/TransactionTab";
import TotalAmount from "@/components/TotalAmout";

export default function Home() {
  // State to track the currently selected month
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  return (
    <div className="h-[100vh]">
      {/* Month Slider */}
      <MonthSlider onMonthChange={(month) => setSelectedMonth(month)} />

      {/* Total Amount */}
      <TotalAmount selectedMonth={selectedMonth} />

      {/* Transaction Tabs */}
      <TransactionTab selectedMonth={selectedMonth} />
    </div>
  );
}
