import { isArtistResult, SearchResult } from "~/models/SearchResult";
import { Artist } from "~/models/Artist";
import { ArtistTile } from "../ArtistTile";
import { SongTile } from "../SongTile";

type Props = {
  loading: boolean;
  results: SearchResult[];
};

const Tile = ({ result }: { result: SearchResult }) => {
  if (isArtistResult(result)) {
    return <ArtistTile artist={result} />;
  }

  return <div>{<SongTile song={result} />}</div>;
};

export const ResultList = ({ results }: Props) => {
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
