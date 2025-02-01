"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Plus, Trash } from "lucide-react";

export default function AddTag() {
  const [tagName, setTagName] = React.useState("");
  const [tags, settags] = React.useState<string[]>([]);

  const addGroup = () => {
    if (tagName.trim() && !tags.includes(tagName)) {
      settags([...tags, tagName]);
      setTagName(""); // Clear input after adding
    }
  };

  const removeGroup = (group: string) => {
    settags(tags.filter((g) => g !== group));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Tag <ChevronRight/></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manage tags</SheetTitle>
        </SheetHeader>

        {/* Input + Add Button */}
        <div className="flex items-center space-x-2 mt-4">
          <Input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Enter Tag name"
            className="flex-1"
          />
          <Button onClick={addGroup} size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Group List */}
        <div className="mt-4 space-y-2 ">
          {tags.length === 0 ? (
            <p className="text-gray-500 text-sm">No tags added.</p>
          ) : (
            tags.map((group, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <span>{group}</span>
                <Button variant="ghost" size="icon" onClick={() => removeGroup(group)}>
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
