"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const Counter = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Decrease Button */}
      <Button variant="outline" size="icon" className="h-6 w-6 rounded-lg">
        <Minus className="h-3 w-3" />
      </Button>

      {/* Number Display */}
      <div className="w-6 text-center text-base "></div>

      {/* Increase Button */}
      <Button variant="outline" size="icon" className="h-6 w-6 rounded-lg">
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default Counter;
