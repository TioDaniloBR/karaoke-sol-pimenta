import { createContext, useContext, useState } from "react";
import { db } from "~/indexedDb/db";
import { Artist } from "~/models/Artist";
import { SearchResult } from "~/models/SearchResult";
import { Song } from "~/models/Song";

type UsePlaylistReturnType = {
  playlist: SearchResult | null;
  fetchPlaylist: () => void;
  handleSongPin: (song: Song) => void;
  handleArtistPin: (artist: Artist) => void;
};

const PlaylistContext = createContext<UsePlaylistReturnType | null>(null);

type Props = {} & React.ComponentProps<"div">;

export const PlaylistProvider = ({ children }: Props) => {
  const [playlist, setPlaylist] = useState<SearchResult | null>(null);

  const fetchPlaylist = async () => {
    const playlist = await db.getPinnedResults();
    setPlaylist(playlist);
  };

  const handleArtistPin = async (artist: Artist) => {
    await db.togglePinArtist(artist);
    fetchPlaylist();
  };

  const handleSongPin = async (song: Song) => {
    await db.togglePinSong(song);
    fetchPlaylist();
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        fetchPlaylist,
        handleSongPin,
        handleArtistPin,
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
