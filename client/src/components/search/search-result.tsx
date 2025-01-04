import { SearchResultsProps } from "@/types/search-bar";

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm, onClear }) =>
  searchTerm ? (
    <div className="mb-4 mt-2  text-sm text-gray-600">
      Showing results for "{searchTerm}"
      <button onClick={onClear} className="ml-2 text-blue-500 hover:underline">
        Clear
      </button>
    </div>
  ) : null;

export default SearchResults;
