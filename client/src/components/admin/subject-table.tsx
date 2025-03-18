/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Pencil, Trash2 } from "lucide-react";
import { Subject } from "@/types/subjects";

interface SubjectsTableProps {
  data: Subject[];
  isLoading: boolean;
  onEdit: (subject: Subject) => void;
  onDelete: (id: string) => void;
}

const SubjectsTable: React.FC<SubjectsTableProps> = ({
  data,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ getValue }: any) => {
          const description = getValue() || "";
          return description.length > 50
            ? `${description.substring(0, 50)}...`
            : description;
        },
      },
      {
        header: "Difficulty",
        accessorKey: "difficulty",
        cell: ({ getValue }: any) => getValue() || "Not set",
      },
      {
        header: "Duration",
        accessorKey: "duration",
        cell: ({ getValue }: any) => getValue() || "Not set",
      },
      {
        header: "Course Type",
        accessorKey: "courseType",
        cell: ({ getValue }: any) => getValue() || "Not set",
      },
      {
        header: "Tags",
        accessorKey: "tags",
        cell: ({ getValue }: any) => {
          const tags = getValue();
          return tags && tags.length > 0 ? tags.join(", ") : "None";
        },
      },
      {
        header: "Badge",
        accessorKey: "badge",
        cell: ({ getValue }: any) => {
          const badge = getValue();

          if (!badge) return <span className="text-gray-400">-</span>;

          // Define badge colors
          const badgeColors: Record<string, string> = {
            New: "bg-green-100 text-green-800",
            Featured: "bg-blue-100 text-blue-800",
            Popular: "bg-purple-100 text-purple-800",
            Hot: "bg-orange-100 text-orange-800",
            Special: "bg-indigo-100 text-indigo-800",
          };

          const colorClass = badgeColors[badge] || "bg-gray-100 text-gray-800";

          return (
            <span className={`px-2 py-1 text-xs ${colorClass} rounded`}>
              {badge}
            </span>
          );
        },
      },
      {
        header: "Students",
        accessorKey: "students",
        cell: ({ getValue }: any) => getValue() || 0,
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ getValue }: any) => new Date(getValue()).toLocaleDateString(),
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }: any) => (
          <div className="flex gap-2">
            <Pencil
              color="blue"
              size={16}
              className="cursor-pointer"
              onClick={() => onEdit(row.original)}
            />

            <Trash2
              color="red"
              size={16}
              className="cursor-pointer"
              onClick={() => onDelete(row.original.id)}
            />
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground h-32">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p>Loading subjects...</p>
      </div>
    );
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-0">
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <div className="flex justify-between p-4 bg-secondary/50">
              <div className="font-medium text-muted-foreground">
                Total Subjects: {data.length}
              </div>
            </div>
            <table className="w-full caption-bottom text-sm">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground bg-secondary/50 hover:bg-secondary/60 transition-colors"
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
                {data.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-border hover:bg-muted/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
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
                      className="h-24 text-center align-middle text-muted-foreground"
                    >
                      No subjects available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectsTable;
