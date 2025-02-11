import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  return (
    <div className="w-[180px]">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="start_time" className="cursor-pointer">
            Start Time
          </SelectItem>
          <SelectItem value="end_time" className="cursor-pointer">
            End Time
          </SelectItem>
          <SelectItem value="name" className="cursor-pointer">
            Name
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
