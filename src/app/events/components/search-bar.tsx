import { Input } from "@/components/ui/input";

type SearchBarProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ searchTerm, onChange }: SearchBarProps) {
  return (
    <Input
      type="text"
      placeholder="Search events..."
      className="p-3 border-2 rounded-xl h-10 w-[790px]"
      value={searchTerm}
      onChange={onChange}
    />
  );
}
