import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface UsePaginationSearchParams {
  initialPage?: number;
  initialLimit?: number;
  initialSearch?: string;
}

export const usePaginationSearch = ({
  initialPage = 1,
  initialLimit = 10,
  initialSearch = "",
}: UsePaginationSearchParams = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Separate states for input value and actual search
  const [inputValue, setInputValue] = useState(
    searchParams?.get("search") || initialSearch
  );
  const [search, setSearch] = useState(
    searchParams?.get("search") || initialSearch
  );

  const [page, setPage] = useState(
    Number(searchParams?.get("page") || initialPage)
  );
  const [limit, setLimit] = useState(
    Number(searchParams?.get("limit") || initialLimit)
  );

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", page.toString());
    if (limit !== initialLimit) params.set("limit", limit.toString());
    if (search) params.set("search", search);

    // Replace the current URL with updated query parameters
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [page, limit, search, router, initialLimit]);

  // Debounced search handler
  const debouncedSearch = useCallback(() => {
    const debounceTimer = setTimeout(() => {
      setSearch(inputValue);
      setPage(1); // Reset to first page on new search
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  // Cleanup effect for debounce
  useEffect(() => {
    const cancel = debouncedSearch();
    return cancel;
  }, [inputValue, debouncedSearch]);

  return {
    page,
    setPage,
    limit,
    setLimit,
    search,
    inputValue,
    setInputValue,
  };
};
