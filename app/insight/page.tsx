import TransactionChart from "@/components/TransactionChart";
import React from "react";

const page = () => {
  return (
    <div className=" mt-7 m-4">
      <div className=" mb-2">
        <h1 className=" text-4xl font-bold">Insight</h1>
        <div className=" flex items-center justify-between">
          <h1>Montly Overview</h1>
          <p>Jan 2025 - Dec 2025</p>
        </div>
      </div>
      <TransactionChart />
    </div>
  );
};

export default page;
