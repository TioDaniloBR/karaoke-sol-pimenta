import { ResultList } from "~/components/ResultsList";
import { usePlaylist } from "~/contexts/PlaylistProvider";

export default function Playlist() {
  const { playlist } = usePlaylist();
  return (
    <main className="p-4">
      <h1>Playlist</h1>
      <ResultList results={playlist} loading={false} />
    </main>
  );
}
