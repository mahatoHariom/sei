/* eslint-disable @typescript-eslint/no-explicit-any */
import { Info } from "lucide-react";
import { formatDate } from "@/helpers/formatdate";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Course } from "@/types/subjects";
import { Button } from "@/components/ui/button";
import { useUnenrollFromSubject } from "@/hooks/subjects";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useColumns = () => {
  // Getting the userId from Redux state
  const { id: userId } = useSelector((state: RootState) => state.user);

  // Mutate function for unenrollment
  const { mutate: unenroll } = useUnenrollFromSubject();

  // Handle unenroll action for a single course
  const handleUnenroll = (subjectId: string) => {
    unenroll({ userId, subjectId });
  };

  return React.useMemo<ColumnDef<Course, any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Course ID",
        cell: ({ getValue }) => (
          <div className="font-medium text-foreground">
            {getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Course Name",
        cell: ({ getValue }) => (
          <div className="font-semibold text-primary">{getValue<string>()}</div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => {
          const description = getValue<string>();
          return (
            <div className="flex items-center">
              <div className="text-muted-foreground truncate max-w-xs">
                {description}
              </div>
              {description && description.length > 50 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-2 cursor-help">
                        <Info
                          size={16}
                          className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-popover text-popover-foreground">
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
            <div className="text-sm text-muted-foreground">
              {dateValue ? formatDate(dateValue) : "N/A"}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="text-center">
            <Button
              onClick={() => handleUnenroll(row.original.id)}
              variant="destructive"
              className="w-full"
            >
              Unenroll
            </Button>
          </div>
        ),
      },
    ],
    [userId] // Add dependencies for the useMemo hook
  );
};
