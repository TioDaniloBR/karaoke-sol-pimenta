import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { SearchResult } from "~/models/SearchResult";
import { db } from "~/indexedDb/db";

export const useSongSearch = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 500);

  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (debouncedSearch) {
      db.getArtistsBySearch(debouncedSearch)
        .then(setResults)
        .then(() => db.getSongsBySearch(debouncedSearch))
        .then(setResults)
        .finally(() => setLoading(false));
    }
  }, [debouncedSearch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return {
    results,
    search,
    handleSearch,
    loading,
  };
};
