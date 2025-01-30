import MonthSlider from "@/components/MonthSlider";
import TotalAmout from "@/components/TotalAmout";
import TransactionTab from "@/components/TransactionTab";

export default function Home() {
  return <div className=" h-[100vh]">
    <MonthSlider/>
    <TotalAmout/>
    <TransactionTab/>
  </div>;
}
