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
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="start_time">Start Time</SelectItem>
        <SelectItem value="name">Name</SelectItem>
        <SelectItem value="event_type">Event Type</SelectItem>
      </SelectContent>
    </Select>
  );
}
