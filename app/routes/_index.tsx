import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.png";
import { useLoaderData } from "@remix-run/react";
import { loader as loaderArtists } from "./api.artistas.internacionais";
import { useState } from "react";
import { Checkbox } from "~/components/Checkbox";
import { ArtistTile } from "~/components/ArtistTile";

export const meta: MetaFunction = () => {
  return [
    { title: "Sol e Pimenta" },
    { name: "description", content: "Bem vindos ao nosso bar!" },
  ];
};

export const loader = async () => {
  const artists = await loaderArtists();

  // TODO: Filtrar artistas para não exibir todos
  return artists;
};

export default function Index() {
  const { artists: artistsData } = useLoaderData<typeof loader>();
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
    <div className="">
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
      <ul>
        {artists.map((artist) => (
          <ArtistTile key={artist.name} artist={artist} />
        ))}
      </ul>
    </div>
  );
}
