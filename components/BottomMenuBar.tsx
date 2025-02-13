import Link from "next/link";
import {
  PiChartPieBold,
  PiHouseBold,
  PiSlidersBold,
  PiWalletBold,
} from "react-icons/pi";
import React from "react";
import AddTransaction from "./AddTransaction";

const BottomMenuBar = () => {
  return (
    <div className=" fixed w-full bottom-0 left-0   ">
      <div className="max-w-md mx-auto flex items-center h-14">
        {" "}
        <NavItem href="/">
          <PiHouseBold className="icon" size={28}/>
        </NavItem>
        <NavItem href="/insight">
          <PiChartPieBold className="icon" size={28}/>
        </NavItem>
        <div className="w-full h-full flex items-center justify-center">
          <AddTransaction />
        </div>
        <NavItem href="/assets">
          <PiWalletBold className="icon" size={28}/>
        </NavItem>
        <NavItem href="/settings">
          <PiSlidersBold className="icon" size={28}/>
        </NavItem>
      </div>
    </div>
  );
};

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="w-full h-full flex items-center justify-center hover:bg-slate-50 bg-white group"
  >
    <div className="text-gray-500 group-hover:text-black group-active:fill-black transition">
      {children}
    </div>
  </Link>
);

export default BottomMenuBar;
