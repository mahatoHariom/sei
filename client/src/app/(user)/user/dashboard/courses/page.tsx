"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useUserCourses } from "@/hooks/users/get-user-enrolled-courses";
import { CustomPagination } from "@/components/custom-pagination";
import { useColumns } from "@/hooks/course/use-course-column";
import SearchBar from "@/components/search/search-bar";
import SearchResults from "@/components/search/search-result";
import CourseTable from "@/components/courses/course-table";

const UserAllCourses: React.FC = () => {
  const { id: userId } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const columns = useColumns();

  const { data, isError, error, isLoading, refetch } = useUserCourses(
    userId,
    page,
    limit,
    searchTerm
  );

  const handleSearch = () => {
    const trimmedSearch = inputValue.trim();
    setSearchTerm(trimmedSearch);
    setPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setInputValue("");
    setSearchTerm("");
    setPage(1);
    refetch();
  };

  if (isError) {
    return (
      <div className="text-red-500 text-center">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="p-6 bg-card text-card-foreground rounded-md shadow-lg">
      <h1 className="text-3xl font-semibold text-primary mb-6">
        User Enrolled Courses
      </h1>

      <SearchBar
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSearch={handleSearch}
        onClear={clearSearch}
        onKeyPress={handleKeyPress}
      />

      <SearchResults searchTerm={searchTerm} onClear={clearSearch} />

      <CourseTable
        data={data?.courses || []}
        columns={columns}
        isLoading={isLoading}
      />

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

export default UserAllCourses;
