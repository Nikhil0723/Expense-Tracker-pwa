"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useCounter } from "@/context/decimalContext";

const Counter = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div className="flex items-center space-x-4">
      {/* Decrease Button */}
      <Button
        onClick={() => decrement}
        variant="outline"
        size="icon"
        className="h-6 w-6 rounded-lg"
      >
        <Minus className="h-3 w-3" />
      </Button>

      {/* Number Display */}
      <div className="w-6 text-center text-base ">{count}</div>

      {/* Increase Button */}
      <Button
        onClick={() => increment}
        variant="outline"
        size="icon"
        className="h-6 w-6 rounded-lg"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default Counter;
