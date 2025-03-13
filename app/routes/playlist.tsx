import { useEffect } from "react";
import { Header } from "~/components/Header";
import { ResultList } from "~/components/ResultsList";
import { usePlaylist } from "~/contexts/PlaylistProvider";

export default function Playlist() {
  const { playlist, fetchPlaylist, handleSongPin, handleArtistPin } =
    usePlaylist();

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="px-5 pt-2 text-white">
      <Header />
      <main className="">
        <h1 className="text-lg mb-4">Favoritos</h1>
        <ResultList
          results={playlist}
          loading={false}
          onArtistPin={handleArtistPin}
          onSongPin={handleSongPin}
        />
      </main>
    </div>
  );
}
