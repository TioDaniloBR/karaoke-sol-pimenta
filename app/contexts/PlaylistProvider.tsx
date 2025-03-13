import { createContext, useContext, useEffect, useState } from "react";
import { db } from "~/indexedDb/db";
import { ArtistResult, SearchResult, SongResult } from "~/models/SearchResult";

type UsePlaylistReturnType = {
  playlist: SearchResult | null;
  fetchPlaylist: () => void;
  handlePin: (result: ArtistResult | SongResult) => void;
};

const PlaylistContext = createContext<UsePlaylistReturnType | null>(null);

type Props = {} & React.ComponentProps<"div">;

export const PlaylistProvider = ({ children }: Props) => {
  const [playlist, setPlaylist] = useState<SearchResult | null>(null);

  const fetchPlaylist = async () => {
    const playlist = await db.getPinnedResults();
    setPlaylist(playlist);
  };

  const handlePin = async (result: ArtistResult | SongResult) => {
    if (result.kind === "artist") {
      await db.togglePinArtist(result);
    }

    if (result.kind === "song") {
      await db.togglePinSong(result);
    }

    fetchPlaylist();
  };

  return (
    <PlaylistContext.Provider
      value={{
        handlePin,
        playlist,
        fetchPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a NavigationProvider");
  }

  return context;
};
