"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PiSlidersBold } from "react-icons/pi";
import { IoBackspace } from "react-icons/io5";
import { Plus, X } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DatePicker } from "./DatePicker";
import Numpad from "./NumPad";

export default function AddTransaction() {
  return (
    <Drawer>
      <DrawerTrigger
        asChild
        className=" w-full h-full flex items-center justify-center bg-white hover:bg-slate-50"
      >
        <Button variant="outline">
          <Plus size={28} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className=" h-full max-w-md mx-auto">
        <DrawerHeader className=" flex justify-start">
          <DrawerClose>
            <Button variant="ghost">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className=" ">
          <div className=" h-[150px] flex items-center justify-end gap-4  mr-8">
            <h1 className=" text-6xl font-medium"> $100000</h1>
            <IoBackspace size={24} />
          </div>

          {/* Input */}

          <div className=" mt-2">
            <div className=" flex gap-2 mx-2">
              <Input
                type="text"
                placeholder="Add Name"
                className=" h-auto py-2.5"
              />

              <Select>
                <SelectTrigger className=" w-16 h-auto p-2.5">
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="a">Apple</SelectItem>
                    <SelectItem value="b">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* select  */}

            <div className=" flex overflow-x-scroll gap-2 items-center mx-2 mt-2">
              <Select defaultValue="income">
                <SelectTrigger className=" w-fit h-auto py-2 px-3 text-base font-medium outline-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select defaultValue="onetime">
                <SelectTrigger className="  w-fit h-auto py-2 px-3 text-base font-medium outline-none bg-black text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="onetime"> One time</SelectItem>
                    <SelectItem value="monthly"> monthly</SelectItem>
                    <SelectItem value="every3month"> Every 3 Month</SelectItem>
                    <SelectItem value="every6month"> Every 6 Month</SelectItem>
                    <SelectItem value="everyyear"> Every Year</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <DatePicker />

              <Select defaultValue="default">
                <SelectTrigger className=" w-fit h-auto py-2 px-3 text-base font-medium outline-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="default"> Tag</SelectItem>
                    <SelectItem value="salary"> Salary</SelectItem>
                    <SelectItem value="rent"> Rent</SelectItem>
                    <SelectItem value="bill"> Bill</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className=" mt-2 mx-2">
            <Numpad />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
