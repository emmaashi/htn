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

export default function SortDropdown({
  onSortChange,
  sortBy,
}: SortDropdownProps) {
  return (
    <Select onValueChange={onSortChange} defaultValue={sortBy}>
      <SelectTrigger className="h-10 w-36 text-center">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="start_time">Start Time</SelectItem>
        <SelectItem value="end_time">End Time</SelectItem>
        <SelectItem value="name">Name</SelectItem>
      </SelectContent>
    </Select>
  );
}
