/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, KeyboardEvent } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Search, X } from "lucide-react";
import { useAdminGetAllEnrolledUsers } from "@/hooks/admin";
import { CustomPagination } from "@/components/custom-pagination";
import { formatDate } from "@/helpers/formatdate";

interface EnrolledUserRow {
  id: string;
  fullName: string;
  email: string;
  course: string; // Concatenated subject names
  enrolledAt: string; // ISO date string
}

const AdminDashboardAllEnrolledUsers: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isError, error, isLoading, refetch } =
    useAdminGetAllEnrolledUsers({
      page,
      limit,
      search: searchTerm,
    });

  const handleSearch = () => {
    const trimmedSearch = inputValue.trim();
    setSearchTerm(trimmedSearch);
    setPage(1);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setInputValue("");
    setSearchTerm("");
    setPage(1);
    refetch();
  };

  const columns: ColumnDef<EnrolledUserRow, any>[] = [
    { accessorKey: "id", header: "User ID" },
    { accessorKey: "fullName", header: "Full Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "course", header: "Course" },
    {
      accessorKey: "enrolledAt",
      header: "Enrolled At",
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },
  ];

  const tableData: EnrolledUserRow[] =
    data?.enrollments.map((enrollment) => ({
      id: enrollment.user.id,
      fullName: enrollment.user.fullName,
      email: enrollment.user.email,
      course: enrollment.subject.map((subj) => subj.name).join(", "),
      enrolledAt: enrollment.createdAt,
    })) ?? [];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading enrolled users...</p>;
  if (isError)
    return (
      <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
    );

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Admin - Enrolled Users
      </h1>

      <div className="mb-4 flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search enrolled users"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none"
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
                    ? `No users found matching "${searchTerm}"`
                    : "No enrolled users available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <CustomPagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboardAllEnrolledUsers;
