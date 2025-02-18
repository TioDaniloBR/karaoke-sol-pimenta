import { useLoaderData } from "@remix-run/react";
import internacionais from "../db/internacionais.json";
import internationalArtists from "../db/internationalArtists.json";
import { LoaderFunctionArgs } from "@remix-run/node";
import { SongTile } from "~/components/SongTile";
import { ArtistTile } from "~/components/ArtistTile";
import { Artist } from "~/models/Artist";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const songs = internacionais.filter(
    (song) => song.artist.toLowerCase() === params.artistId?.toLowerCase()
  );

  const artist = internationalArtists.find(
    (artist) => artist.name === params.artistId
  ) as unknown as Artist;

  return { songs, artist };
};

export default function Artistas() {
  const { artist, songs } = useLoaderData<typeof loader>();
  console.log(artist);
  console.log(songs);

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
