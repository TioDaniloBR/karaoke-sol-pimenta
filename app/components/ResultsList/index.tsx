import { isArtistResult, SearchResult } from "~/models/SearchResult";
import { ArtistTile } from "../ArtistTile";
import { SongTile } from "../SongTile";

const Tile = ({ result }: { result: SearchResult }) => {
  if (isArtistResult(result)) {
    return <ArtistTile artist={result} />;
  }

  return <div>{<SongTile song={result} />}</div>;
};

type Props = {
  loading: boolean;
  results: SearchResult[];
};

export const ResultList = ({ results, loading }: Props) => {
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <ul>
        {results.map((result) => (
          <Tile key={result.id} result={result} />
        ))}
      </ul>
    </div>
  );
};
