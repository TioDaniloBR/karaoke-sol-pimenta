import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.png";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Checkbox } from "~/components/Checkbox";
import { ArtistTile } from "~/components/ArtistTile";
import { getArtists } from "~/db/repository";

export const meta: MetaFunction = () => {
  return [
    { title: "Sol e Pimenta" },
    { name: "description", content: "Bem vindos ao nosso bar!" },
  ];
};

export const loader = async () => {
  const artists = getArtists();

  // TODO: Filtrar artistas para não exibir todos
  return artists;
};

export default function Index() {
  const artistsData = useLoaderData<typeof loader>();
  const [artists, setArtists] = useState(artistsData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;

    if (filter) {
      const filteredArtists = artistsData.filter((artist) =>
        artist.name.toLowerCase().includes(filter.toLowerCase())
      );
      setArtists(filteredArtists);
    } else {
      setArtists(artistsData);
    }
  };

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
          <input name="filter" id="filter" onChange={handleChange} />
        </div>
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {artists.map((artist) => (
          <ArtistTile key={artist.name} artist={artist} />
        ))}
      </ul>
    </div>
  );
}
