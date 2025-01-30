import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter } from "lucide-react";
import { Button } from "./ui/button";
import TransactionCard from "./TransactionCard";
import { ScrollArea } from "./ui/scroll-area";

export default function TransactionTab() {
  return (
    <Tabs defaultValue="income" className="w-full mt-5 p-3">
      <div className=" flex">
        <TabsList className=" flex-1 grid w-full grid-cols-2">
          <TabsTrigger value="income" className=" flex-1">
            Income
          </TabsTrigger>
          <TabsTrigger value="expense" className=" flex-1">
            Expense
          </TabsTrigger>
        </TabsList>
        <Button
          variant="outline"
          size="icon"
          className=" ml-2 h-auto w-auto p-5"
        >
          <ListFilter />
        </Button>
      </div>
      <TabsContent value="income" className="p-0 m-0 h-full">
        <ScrollArea className="h-[420px]  w-full rounded-md ">
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </ScrollArea>
      </TabsContent>
      <TabsContent value="expense" className="p-0 m-0 h-full">
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </TabsContent>
    </Tabs>
  );
}
