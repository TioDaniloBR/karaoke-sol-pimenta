import { SearchResult } from "~/models/SearchResult";
import { ArtistTile } from "../ArtistTile";
import { SongTile } from "../SongTile";
import { Link } from "@remix-run/react";
import { Container } from "../Container";
import { SectionTitle } from "../SectionTitle";

type Props = {
  loading: boolean;
  results: SearchResult | null;
};

export const ResultList = ({ results, loading }: Props) => {
  if (loading || !results) {
    return <div>Carregando...</div>;
  }

  const { songsResult, artistsResult } = results;

  return (
    <section>
      <Container>
        <SectionTitle>Artistas</SectionTitle>
        <ul className="grid gap-2">
          {artistsResult.map((result) => (
            <li>
              <Link to={`/artist/${result.name}`}>
                <ArtistTile artist={result} />
              </Link>
            </li>
          ))}
        </ul>
        <SectionTitle>Músicas</SectionTitle>
        <ul className="grid gap-6">
          {songsResult.map((result) => (
            <li>
              <SongTile song={result} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
