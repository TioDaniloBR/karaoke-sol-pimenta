import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.png";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Checkbox } from "~/components/Checkbox";
import { ArtistTile } from "~/components/ArtistTile";
import { fetchArtists, fetchSongs } from "~/db/repository";
import { getArtists, storeArtists, storeSongs } from "~/indexedDb/db";
import { Artist } from "~/models/Artist";

export const meta: MetaFunction = () => {
  return [
    { title: "Sol e Pimenta" },
    { name: "description", content: "Bem vindos ao nosso bar!" },
  ];
};

// export const loader = async () => {
//   const artists = fetchArtists();
//   const songs = fetchSongs();
//
//   // TODO: Filtrar artistas para não exibir todos
//   return { artists, songs };
// };

export default function Index() {
  // const { artists: artistsData, songs } = useLoaderData<typeof loader>();

  // useEffect(() => {
  //   storeArtists(artistsData);
  //   storeSongs(songs);
  // }, [artistsData, songs]);

  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    getArtists("Nacional", 0).then(setArtists);
  }, []);

  return (
    <div className="w-4/5 mx-auto max-w-xl">
      <img src={logo} alt="Sol e Pimenta Lounge Bar" />
      <div className="flex">
        <div>
          <Checkbox label="Nacionais" />
          <Checkbox label="Internacionais" />
        </div>
        <div>
          <label htmlFor="filter">Localizar</label>
          <input name="filter" id="filter" />
        </div>
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {artists.map((artist) => (
          <Link to={`/artist/${artist.name}`} key={artist.name}>
            <ArtistTile artist={artist} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
