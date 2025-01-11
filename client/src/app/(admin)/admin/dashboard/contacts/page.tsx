/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, KeyboardEvent } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { Pencil, Trash2, Search, X } from "lucide-react";
import { useAdminGetAllContacts } from "@/hooks/admin";
import { formatDate } from "@/helpers/formatdate";
import { CustomPagination } from "@/components/custom-pagination";
import EditContactModal from "@/components/admin/edit-contact-modal";
import DeleteContactModal from "@/components/admin/delete-contact-modal";

const AdminAllContacts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  const { data, isError, error, isLoading, refetch } = useAdminGetAllContacts({
    page,
    limit,
    search: searchTerm,
  });

  // const editContactMutation = useAdminEditContact();
  // const deleteContactMutation = useAdminDeleteContact();

  const handleSearch = () => {
    setSearchTerm(inputValue.trim());
    setPage(1);
  };

  const handleDelete = (contactId: string) => {
    setContactToDelete(contactId);
    setIsDeleteModalOpen(true);
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

  const handleEdit = (contact: any) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const columns: ColumnDef<any, any>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "message", header: "Message" },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-blue-500 hover:underline"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 hover:underline"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data?.contacts ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading contacts...</p>;
  if (isError)
    return (
      <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
    );

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Admin - All Contacts
      </h1>

      <div className="mb-4 flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search contacts"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none"
          />
          {inputValue && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-3 rounded-lg flex items-center"
        >
          <Search size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 text-left">
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
                    <td key={cell.id} className="p-4 border-t">
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
                <td colSpan={columns.length} className="text-center p-4">
                  {searchTerm
                    ? `No contacts found for "${searchTerm}"`
                    : "No contacts available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-6">
          <CustomPagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      {selectedContact && (
        <EditContactModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          contactId={selectedContact.id}
          initialName={selectedContact.name}
          initialPhone={selectedContact.phone}
          initialEmail={selectedContact.email}
          initialMessage={selectedContact.message}
        />
      )}

      {contactToDelete && (
        <DeleteContactModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          contactId={contactToDelete}
        />
      )}
    </div>
  );
};

export default AdminAllContacts;
