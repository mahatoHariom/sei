/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";
import React, { useState, KeyboardEvent } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Info, Search, X } from "lucide-react";

import { formatDate } from "@/helpers/formatdate";
import { useUserCourses } from "@/hooks/users/get-user-enrolled-courses";

import { Course } from "@/types/subjects";
import { CustomPagination } from "@/components/custom-pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UserAllCourses: React.FC = () => {
  const { id: userId } = useSelector((state: RootState) => state.user);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch courses with the current pagination and search parameters
  const { data, isError, error, isLoading, refetch } = useUserCourses(
    userId,
    page,
    limit,
    searchTerm
  );

  // Handle search submission
  const handleSearch = () => {
    // Trim input and set search term
    const trimmedSearch = inputValue.trim();
    setSearchTerm(trimmedSearch);
    setPage(1); // Reset to first page on new search
  };

  // Handle keyboard enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Clear search
  const clearSearch = () => {
    setInputValue("");
    setSearchTerm("");
    setPage(1);
    refetch(); // Refetch original data
  };

  // Columns for the table
  const columns: ColumnDef<Course, any>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Course ID",
        cell: ({ getValue }) => (
          <div className="font-medium text-gray-900">{getValue<string>()}</div>
        ),
      },
      {
        accessorKey: "name",
        header: "Course Name",
        cell: ({ getValue }) => (
          <div className="font-semibold text-blue-600">
            {getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => {
          const description = getValue<string>();
          return (
            <div className="flex items-center">
              <div className="text-gray-600 truncate max-w-xs">
                {description}
              </div>
              {description && description.length > 50 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-2 cursor-help">
                        <Info size={16} className="text-gray-400" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      {description}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        cell: ({ getValue }) => {
          const dateValue = getValue<string>();
          return (
            <div className="text-sm text-gray-500">
              {dateValue ? formatDate(dateValue) : "N/A"}
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: data?.courses || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading courses...</p>;
  if (isError)
    return (
      <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
    );

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        User Enrolled Courses
      </h1>

      {/* Search Input with Button */}
      <div className="mb-4 flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search courses"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {inputValue && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>

      {searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          Showing results for "{searchTerm}"
          <button
            onClick={clearSearch}
            className="ml-2 text-blue-500 hover:underline"
          >
            Clear
          </button>
        </div>
      )}
      {/* Table Rendering */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 rounded-md">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-4 text-left text-gray-700 font-medium"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-4 border-t border-gray-200 text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 text-gray-500"
                >
                  {searchTerm
                    ? `No courses found matching ${searchTerm}`
                    : "No courses available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Pagination */}
      {data && data.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <CustomPagination
            currentPage={page}
            totalPages={data?.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default UserAllCourses;
