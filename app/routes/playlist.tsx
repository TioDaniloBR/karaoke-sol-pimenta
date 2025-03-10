import { ResultList } from "~/components/ResultsList";
import { useNavigationController } from "~/contexts/NavigationProvider";

export default function Playlist() {
  const { playlist } = useNavigationController();
  return (
    <main className="p-4">
      <h1>Playlist</h1>
      <ResultList results={playlist} loading={false} />
    </main>
  );
}
