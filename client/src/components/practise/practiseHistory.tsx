// src/components/practice/PracticeHistory.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { usePracticeHistory } from "@/hooks/practise";
import { Practice } from "@/types/practise";

export const PracticeHistory = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePracticeHistory(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.practices?.map((practice: Practice) => (
            <TableRow key={practice.id}>
              <TableCell>{practice.subject.name}</TableCell>
              <TableCell>{practice.difficulty}</TableCell>
              <TableCell>
                {practice.score}/{practice.totalQuestions}
              </TableCell>
              <TableCell>
                {new Date(practice.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data?.pagination.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                isActive={page !== 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => p + 1)}
                isActive={page < data?.pagination?.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
