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
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md">
      <div className="max-w-md mx-auto flex items-center justify-between h-16 px-4">
        <NavItem href="/">
          <PiHouseBold size={24} />
        </NavItem>
        <NavItem href="/insight">
          <PiChartPieBold size={24} />
        </NavItem>
        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full shadow-lg">
          <AddTransaction />
        </div>
        <NavItem href="/assets">
          <PiWalletBold size={24} />
        </NavItem>
        <NavItem href="/settings">
          <PiSlidersBold size={24} />
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
    className="flex flex-col items-center justify-center text-gray-500 hover:text-black transition w-12 h-12"
  >
    {children}
  </Link>
);

export default BottomMenuBar;
