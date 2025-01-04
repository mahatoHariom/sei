import React, { useEffect } from "react";
import { X } from "lucide-react";

interface SearchBarProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  inputValue,
  onInputChange,
  onSearch,
  onClear,
  onKeyPress,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange(value);
  };

  const handleClear = () => {
    onInputChange(""); // First update the input value to empty
    onClear(); // Then clear any stored search state
    setTimeout(() => {
      onSearch(); // Finally trigger the search after state updates
    }, 0);
  };

  // Handle manual clearing
  useEffect(() => {
    if (inputValue === "") {
      onClear();
      onSearch();
    }
  }, [inputValue, onClear, onSearch]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={onKeyPress}
        placeholder="Search courses"
        className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
