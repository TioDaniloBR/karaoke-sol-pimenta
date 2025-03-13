import { useNavigate, useParams } from "@remix-run/react";
import { SongTile } from "~/components/SongTile";
import { ArtistTile } from "~/components/ArtistTile";
import { db } from "~/indexedDb/db";
import { useEffect, useState, Suspense } from "react";
import { ArtistWithSongs } from "~/models/ArtistWithSongs";
import { Container } from "~/components/Container";
import { Header } from "~/components/Header";
import { Song } from "~/models/Song";

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState<ArtistWithSongs | null>(null);

  const fetchArtist = () => db.getArtist(String(artistId)).then(setArtist);

  useEffect(() => {
    fetchArtist();
  }, []);

  const handlePin = async (song: Song) => {
    await db.togglePinSong(song);
    fetchArtist();
  };

  if (!artist) {
    return <div>Carregando...</div>;
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <div className="px-5 pt-2">
        <Header />
        <main className="mx-auto max-w-md">
          <section className="flex justify-between mb-8 items-center">
            <ArtistTile artist={artist} variant="medium" />
          </section>
          <Container className="shadow-blurred">
            <ul className="grid gap-4">
              {artist.songs.map((song) => (
                <SongTile
                  key={song.code}
                  song={song}
                  variant="artistList"
                  onPin={handlePin}
                />
              ))}
            </ul>
          </Container>
        </main>
      </div>
    </Suspense>
  );
}
