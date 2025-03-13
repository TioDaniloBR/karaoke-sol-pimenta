import { createContext, useContext, useEffect, useState } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import { db } from "~/indexedDb/db";
import { Artist } from "~/models/Artist";
import { SearchResult } from "~/models/SearchResult";
import { Song } from "~/models/Song";

type UseSongSearchReturnType = {
  results: SearchResult | null;
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  resetSearch: () => void;
  handleArtistPin: (artist: Artist) => void;
  handleSongPin: (song: Song) => void;
};

const SongSearchContext = createContext<UseSongSearchReturnType | null>(null);

type Props = {} & React.ComponentProps<"div">;

export const SongSearchProvider = ({ children }: Props) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 500);

  const [results, setResults] = useState<SearchResult | null>(null);

  useEffect(() => {
    if (debouncedSearch.length > 1) {
      db.getResults(debouncedSearch)
        .then(setResults)
        .finally(() => setLoading(false));
    }
  }, [debouncedSearch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearch(event.target.value);
  };

  const resetSearch = () => {
    setSearch("");
    setResults(null);
  };

  const handleArtistPin = async (artist: Artist) => {
    if (!results) return;

    await db.togglePinArtist(artist);
    setResults({ ...results });
  };

  const handleSongPin = async (song: Song) => {
    if (!results) return;
    await db.togglePinSong(song);

    setResults({ ...results });
  };

  return (
    <SongSearchContext.Provider
      value={{
        handleSearch,
        loading,
        search,
        results,
        resetSearch,
        handleSongPin,
        handleArtistPin,
      }}
    >
      {children}
    </SongSearchContext.Provider>
  );
};

export const useSongSearch = () => {
  const context = useContext(SongSearchContext);
  if (!context) {
    throw new Error("useSongSearch must be used within a SongSearchProvider");
  }

  return context;
};
