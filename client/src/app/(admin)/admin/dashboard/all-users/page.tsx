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
import { formatDate } from "@/helpers/formatdate";
import { useAdminGetAllUsers } from "@/hooks/admin";
import DeleteUserModal from "@/components/admin/deleteUserModal";
import { CustomPagination } from "@/components/custom-pagination";

const AdminDashboardAllUsers: React.FC = () => {
  // State for search and pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fetch users data
  const { data, isError, error, isLoading, refetch } = useAdminGetAllUsers({
    page,
    limit,
    search: searchTerm,
  });

  // Handle search submission
  const handleSearch = () => {
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
    refetch();
  };

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "id",
      header: "User ID",
      cell: ({ getValue }) => (
        <div className="font-medium text-gray-900">{getValue<string>()}</div>
      ),
    },
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ getValue }) => (
        <div className="font-semibold text-blue-600">{getValue<string>()}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <div className="text-gray-600">{getValue<string>()}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ getValue }) => (
        <div className="text-gray-500">{getValue<string>()}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ getValue }) => (
        <div className="text-sm text-gray-500">
          {formatDate(getValue<string>())}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => console.log("Edit user", row.original.id)}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setSelectedUserId(row.original.id);
              setDeleteModalOpen(true);
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError)
    return (
      <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
    );

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Admin - All Users
      </h1>

      {/* Search Input with Button */}
      <div className="mb-4 flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search users"
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

      {/* Search Results Indicator */}
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

      {/* Table */}
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
                    ? `No users found matching ${searchTerm}`
                    : "No users available"}
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
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedUserId(null);
          }}
          userId={selectedUserId}
        />
      )}
    </div>
  );
};

export default AdminDashboardAllUsers;
