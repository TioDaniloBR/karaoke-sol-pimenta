import { createContext, useContext, useEffect, useState } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import { db } from "~/indexedDb/db";
import { ArtistResult, SearchResult, SongResult } from "~/models/SearchResult";

type UseSongSearchReturnType = {
  results: SearchResult | null;
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  resetSearch: () => void;
  handlePinSong: (songResult: SongResult) => void;
  handlePinArtist: (result: ArtistResult | SongResult) => void;
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

  const handlePinSong = async (songResult: SongResult) => {
    if (!results) return;

    const song = results.songsResult.find((s) => s.id === songResult.id);
    if (!song) return;

    if (song.pinned) {
      await db.unpinSong(song);
    } else {
      await db.pinSong(song);
    }

    song.pinned = !song.pinned;
    setResults({ ...results });
  };

  const handlePinArtist = async (result: ArtistResult | SongResult) => {
    if (!results) return;

    const artist = results.artistsResult.find((a) => a.id === result.id);
    if (!artist) return;

    if (artist.pinned) {
      await db.unpinArtist(artist);
    } else {
      await db.pinArtist(artist);
    }

    artist.pinned = !artist.pinned;

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
        handlePinSong,
        handlePinArtist,
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
