import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash } from "lucide-react";

interface TransactionOptionsPopoverProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function TransactionOptionsPopover({ onEdit, onDelete }: TransactionOptionsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-32 p-2 bg-white shadow-md rounded-md">
        <button
          onClick={onEdit}
          className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100"
        >
          <Edit className="w-4 h-4 mr-2" /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex w-full items-center px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
        >
          <Trash className="w-4 h-4 mr-2" /> Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
