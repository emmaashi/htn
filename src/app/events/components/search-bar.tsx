import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ searchTerm, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={onChange}
        className="pl-10 pr-4 py-2 w-full"
      />
    </div>
  );
}
