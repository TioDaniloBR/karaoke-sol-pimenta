import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { SongTile } from "~/components/SongTile";
import { ArtistTile } from "~/components/ArtistTile";
import { getArtist } from "~/db/repository";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const artistName = String(params.artistId);
  const artist = getArtist(artistName);

  if (!artist) {
    throw new Error("Artist not found");
  }

  return artist;
};

export default function Artistas() {
  const { songs, ...artist } = useLoaderData<typeof loader>();

  return (
    <div>
      <ArtistTile artist={artist} variant="medium" />

      <ul className="grid gap-4">
        {songs.map((song) => (
          <SongTile key={song.code} song={song} />
        ))}
      </ul>
    </div>
  );
}
