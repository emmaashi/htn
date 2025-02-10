import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortDropdownProps = {
    onSortChange: (val: string) => void;
    sortBy: string;
};

export function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  return (
    <Select onValueChange={onSortChange} defaultValue={sortBy}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="start_time" className="cursor-pointer">Start Time</SelectItem>
        <SelectItem value="end_time" className="cursor-pointer">End Time</SelectItem>
        <SelectItem value="name" className="cursor-pointer">Name</SelectItem>
      </SelectContent>
    </Select>
  );
}
