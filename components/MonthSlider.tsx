"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MonthSlider = () => {
  const [date, setDate] = useState(new Date().toISOString());

  useEffect(() => {
    const dateData = new Date();
    setDate(
      dateData.toLocaleString("en-US", { month: "long", year: "numeric" })
    );
  }, []);

  return (
    <div className=" flex items-center justify-around mx-8 py-8">
      <Button variant="ghost" size="icon">
        <ChevronLeft />
      </Button>
      <p> {date}</p>
      <Button variant="ghost" size="icon">
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MonthSlider;
