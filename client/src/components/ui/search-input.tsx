"use client";

import React, { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
  searchTerm?: string;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "Search...",
  className,
  searchTerm,
}: SearchInputProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className={cn("flex items-center space-x-2", className)}>
        <div className="relative flex-grow">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="pr-10"
          />
          {value && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClear}
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
              type="button"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
        <Button
          onClick={onSearch}
          variant="default"
          className="flex items-center gap-2"
          type="button"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>

      {searchTerm && (
        <div className="text-sm text-muted-foreground">
          Showing results for "{searchTerm}"
          <Button
            onClick={onClear}
            variant="link"
            className="ml-2 h-auto p-0 text-primary"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
