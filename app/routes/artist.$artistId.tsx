import { useNavigate, useParams } from "@remix-run/react";
import { SongTile } from "~/components/SongTile";
import { ArtistTile } from "~/components/ArtistTile";
import { db } from "~/indexedDb/db";
import { useEffect, useState, Suspense } from "react";
import { ArtistWithSongs } from "~/models/ArtistWithSongs";
import backIcon from "~/images/back.png";
import { Container } from "~/components/Container";

export default function ArtistPage() {
  const navigate = useNavigate();
  const { artistId } = useParams();
  const [artist, setArtist] = useState<ArtistWithSongs | null>(null);

  useEffect(() => {
    db.getArtist(String(artistId)).then(setArtist);
  }, [artistId]);

  if (!artist) {
    return <div>Carregando...</div>;
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <main className="mx-auto p-6 max-w-3xl">
        <section className="flex justify-between mb-8 items-center">
          <ArtistTile artist={artist} variant="medium" />
          <button onClick={() => navigate(-1)}>
            <img
              src={backIcon}
              alt="Voltar para a página anterior"
              className="w-20"
            />
          </button>
        </section>
        <Container className="shadow-blurred">
          <ul className="grid gap-4">
            {artist.songs.map((song) => (
              <SongTile key={song.code} song={song} />
            ))}
          </ul>
        </Container>
      </main>
    </Suspense>
  );
}
