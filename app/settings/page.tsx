import React from "react";
import { VscColorMode } from "react-icons/vsc";
import { TbLanguageHiragana } from "react-icons/tb";
import { MdCurrencyRupee } from "react-icons/md";
import { TbDecimal } from "react-icons/tb";
import { IoMdEye } from "react-icons/io";
import { TbNumber123 } from "react-icons/tb";
import { IoGrid } from "react-icons/io5";
import { FaTags } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { ModeToggle } from "@/components/setting/ThemeToggle";
import { LanguageSelect } from "@/components/setting/SelectLanguage";
import { CurrencySelect } from "@/components/setting/SelectCurrency";
import SelectDecimal from "@/components/setting/SelectDecimal";
import { NumberFormatSelect } from "@/components/setting/SelectNumberFormat";
import AddGroup from "@/components/setting/AddGroup";
import AddTag from "@/components/setting/AddTag";
import DeleteData from "@/components/setting/DeleteData";

const page = () => {
  return (
    <div className=" p-4 h-[100vh]">
      <h1 className=" text-4xl font-bold">Settings</h1>
      {/* General */}
      <div className=" mt-4">
        <h6 className=" text-sm font-semibold text-zinc-400">GENRAL</h6>
        <div className=" flex items-center justify-between my-2 ">
          <div className=" flex items-center gap-2">
            <VscColorMode
              size={24}
              className=" p-1 bg-blue-400 rounded-lg text-white"
            />
            Theme
          </div>
          <ModeToggle />
        </div>
        <div className=" flex items-center justify-between  my-2 ">
          <div className=" flex items-center gap-2">
            <TbLanguageHiragana
              size={24}
              className=" p-1 bg-[#F97316] rounded-lg text-white"
            />
            Language & Region
          </div>
          <LanguageSelect />
        </div>
      </div>
      {/* currency */}
      <div className=" mt-4">
        <h6 className=" text-sm font-semibold text-zinc-400">CURRENCY</h6>
        <div className=" flex items-center justify-between  my-2 ">
          <div className=" flex items-center gap-2">
            <MdCurrencyRupee
              size={24}
              className=" p-1 bg-[#22C55E] rounded-lg text-white"
            />
            Main currency
          </div>
          <CurrencySelect/>
        </div>
        <div className=" flex items-center justify-between my-2  ">
          <div className=" flex items-center gap-2">
            <TbDecimal
              size={24}
              className=" p-1 bg-[#23BDAC] rounded-lg text-white"
            />
            Decimal length
          </div>
          <SelectDecimal/>
        </div>
        <div className=" flex items-center justify-between my-2 ">
          <div className=" flex items-center gap-2">
            <TbNumber123
              size={24}
              className=" p-1 bg-[#0891B2] rounded-lg text-white"
            />
            Number format
          </div>
          <NumberFormatSelect/>
        </div>
        <div className=" flex items-center justify-between my-2 ">
          <div className=" flex items-center gap-2">
            <IoMdEye
              size={24}
              className=" p-1 bg-[#71717A] rounded-lg text-white"
            />
            Preview
          </div>
          <p className=" text-sm ">973923434</p>
        </div>
      </div>
      {/* Group & tags */}
      <div className=" mt-4">
        <h6 className=" text-sm font-semibold text-zinc-400">GROUPS & TAGS</h6>
        <div className=" flex items-center justify-between my-2 ">
          <div className=" flex items-center gap-2">
            <IoGrid
              size={24}
              className=" p-1 bg-[#F97316] rounded-lg text-white"
            />
            Groups
          </div>
          <AddGroup/>
        </div>
        <div className=" flex items-center justify-between my-2 ">
          <div className=" flex items-center gap-2">
            <FaTags
              size={24}
              className=" p-1 bg-[#D946EF] rounded-lg text-white"
            />
            Tags
          </div>
          <AddTag/>
        </div>
      </div>
      {/* data */}
      <div className=" mt-4">
        <h6 className=" text-sm font-semibold text-zinc-400">DATA</h6>
        <div className=" flex items-center justify-between my-2 ">
          <div className=" flex items-center gap-2">
            <CiExport
              size={24}
              className=" p-1 bg-[#14B8A6] rounded-lg text-white"
            />
            Export Data
          </div>
          <DeleteData/>
        </div>
        <div className=" flex items-center justify-between my-2 ">
          <div className=" flex items-center gap-2">
            <MdDeleteForever
              size={24}
              className=" p-1 bg-[#EF4444] rounded-lg text-white"
            />
            Erase Data
          </div>
          <DeleteData/>
        </div>
      </div>
    </div>
  );
};

export default page;
