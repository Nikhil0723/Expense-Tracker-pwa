import React from "react";
import { Checkbox } from "./ui/checkbox";
import { EllipsisVertical } from "lucide-react";

const TransactionCard = () => {
  return (
    <div className=" flex items-center justify-between border-b">
      <div className=" flex">
        <div className=" p-4 border-r">
          {" "}
          <Checkbox className=" h-6 w-6 m-0 p-0 outline-none "/>
        </div>
        <div className=" ml-2 flex flex-col items-start justify-center gap-1 text-left"> 
            <h5 className=" text-sm text-left font-semibold">Title</h5>
            <p className=" text-sm  text-left"> 26 jan</p>
        </div>
      </div>
      <div className=" flex items-center gap-2 ">
        <p className=" text-base ">$100000</p>
        <EllipsisVertical size={18} />
      </div>
    </div>
  );
};

export default TransactionCard;
