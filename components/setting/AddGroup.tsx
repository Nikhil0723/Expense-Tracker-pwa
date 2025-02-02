"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs
import { useAppSettings } from "@/context/AppSettingContext";

export default function AddGroup() {
  const [groupName, setGroupName] = React.useState("");
  const { settings, addGroup, deleteGroup } = useAppSettings(); // Use context

  const handleAddGroup = () => {
    if (groupName.trim() && !settings.groups.some((g) => g.label === groupName)) {
      addGroup({ uuid: uuidv4(), label: groupName }); // Use context function
      setGroupName(""); // Clear input after adding
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Group <ChevronRight /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manage Groups</SheetTitle>
        </SheetHeader>

        {/* Input + Add Button */}
        <div className="flex items-center space-x-2 mt-4">
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="flex-1"
          />
          <Button onClick={handleAddGroup} size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Group List */}
        <div className="mt-4 space-y-2">
          {settings.groups.length === 0 ? (
            <p className="text-gray-500 text-sm">No groups added.</p>
          ) : (
            settings.groups.map((group) => (
              <div key={group.uuid} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <span>{group.label}</span>
                <Button variant="ghost" size="icon" onClick={() => deleteGroup(group.uuid)}>
                  <Trash className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
