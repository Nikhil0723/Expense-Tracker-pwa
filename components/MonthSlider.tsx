"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthSliderProps {
  onMonthChange: (month: Date) => void; // Callback to notify parent of month changes
}

const MonthSlider = ({ onMonthChange }: MonthSliderProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Move to the previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    onMonthChange(newDate); // Notify parent of the change
  };

  // Move to the next month
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    onMonthChange(newDate); // Notify parent of the change
  };

  return (
    <div className="flex items-center justify-around mx-8 py-6">
      {/* Previous Month Button */}
      <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
        <ChevronLeft />
      </Button>

      {/* Current Month Display */}
      <p>
        {currentDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Next Month Button */}
      <Button variant="ghost" size="icon" onClick={goToNextMonth}>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MonthSlider;
