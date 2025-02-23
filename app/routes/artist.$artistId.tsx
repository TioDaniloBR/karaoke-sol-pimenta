import { useNavigate, useParams } from "@remix-run/react";
import { SongTile } from "~/components/SongTile";
import { ArtistTile } from "~/components/ArtistTile";
import { db } from "~/indexedDb/db";
import { useEffect, useState } from "react";
import { Artist } from "~/models/Artist";
import { Song } from "~/models/Song";

type ArtistWithSongs = (Artist & { songs: Song[] }) | null;

export default function ArtistPage() {
  const navigate = useNavigate();
  const { artistId } = useParams();
  const [artist, setArtist] = useState<ArtistWithSongs>(null);

  useEffect(() => {
    db.getArtist(String(artistId)).then(setArtist);
  }, [artistId]);

  if (!artist) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <ArtistTile artist={artist} variant="medium" />

      <ul className="grid gap-4">
        {artist.songs.map((song) => (
          <SongTile key={song.code} song={song} />
        ))}
      </ul>
    </div>
  );
}
