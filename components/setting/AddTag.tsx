"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useAppSettings } from "@/context/AppSettingContext";

export default function AddTag() {
  const [tagName, setTagName] = React.useState("");
  const [tagColor, setTagColor] = React.useState("#000000"); // Default color
  const { settings, addTag, deleteTag } = useAppSettings(); // Use context

  const handleAddTag = () => {
    if (tagName.trim() && !settings.tags.some((t) => t.label === tagName)) {
      addTag({ uuid: uuidv4(), label: tagName, color: tagColor }); // Add tag with color
      setTagName(""); // Clear input
      setTagColor("#000000"); // Reset color
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Tag <ChevronRight /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manage Tags</SheetTitle>
        </SheetHeader>

        {/* Color Picker + Input + Add Button */}
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="color"
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
            className="w-10 h-10 border rounded-md"
          />
          <Input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Enter tag name"
            className="flex-1"
          />
          <Button onClick={handleAddTag} size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Tag List */}
        <div className="mt-4 space-y-2">
          {settings.tags.length === 0 ? (
            <p className="text-gray-500 text-sm">No tags added.</p>
          ) : (
            settings.tags.map((tag) => (
              <div key={tag.uuid} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  ></div>
                  <span>{tag.label}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTag(tag.uuid)}>
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
