import { useNavigate, useParams } from "@remix-run/react";
import { SongTile } from "~/components/SongTile";
import { ArtistTile } from "~/components/ArtistTile";
import { db } from "~/indexedDb/db";
import { useEffect, useState, Suspense } from "react";
import { ArtistWithSongs } from "~/models/ArtistWithSongs";
import { Container } from "~/components/Container";
import { Header } from "~/components/Header";

export default function ArtistPage() {
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
      <Header />
      <main className="mx-auto p-6 max-w-3xl">
        <section className="flex justify-between mb-8 items-center">
          <ArtistTile artist={artist} variant="medium" />
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
