import { ArtistResult, SearchResult, SongResult } from "~/models/SearchResult";
import { ArtistTile } from "../ArtistTile";
import { SongTile } from "../SongTile";
import { useNavigate } from "@remix-run/react";
import { Container } from "../Container";
import { SectionTitle } from "../SectionTitle";
import { Artist } from "~/models/Artist";
import { Song } from "~/models/Song";

type Props = {
  loading: boolean;
  results: SearchResult | null;
  onArtistPin: (artist: Artist) => void;
  onSongPin: (song: Song) => void;
};

export const ResultList = ({
  results,
  loading,
  onArtistPin,
  onSongPin,
}: Props) => {
  const navigate = useNavigate();

  if (loading || !results) {
    return <div>Carregando...</div>;
  }

  const { songsResult, artistsResult } = results;

  return (
    <section>
      {artistsResult.length === 0 && songsResult.length === 0 ? (
        <p className="text-center text-lg mt-8">Nenhum resultado encontrado</p>
      ) : (
        <Container>
          {artistsResult.length > 0 && <SectionTitle>Artistas</SectionTitle>}
          <ul className="grid gap-2">
            {artistsResult.map((result) => (
              <li>
                <ArtistTile
                  artist={result}
                  onTileClick={() => navigate(`/artist/${result.id}`)}
                  onPinClick={() => onArtistPin(result)}
                />
              </li>
            ))}
          </ul>
          {songsResult.length > 0 && <SectionTitle>Músicas</SectionTitle>}
          <ul className="grid gap-6">
            {songsResult.map((result) => (
              <SongTile
                key={result.id}
                song={result}
                variant="result"
                onPin={() => onSongPin(result)}
              />
            ))}
          </ul>
        </Container>
      )}
    </section>
  );
};
