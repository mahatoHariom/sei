/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@/types/subjects";

export interface SearchBarProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface SearchResultsProps {
  searchTerm: string;
  onClear: () => void;
}

export interface CourseTableProps {
  data: Course[];
  columns: ColumnDef<Course, any>[];
  isLoading: boolean;
}
