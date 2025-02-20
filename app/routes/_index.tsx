import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";
import { Checkbox } from "~/components/Checkbox";
import { fetchAndStoreData, getArtists } from "~/indexedDb/db";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";
import { ArtistList } from "~/components/ArtistList";

export const meta: MetaFunction = () => {
  return [
    { title: "Sol e Pimenta" },
    { name: "description", content: "Bem vindos ao nosso bar!" },
  ];
};

export default function Index() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(new Set<Country>());
  useEffect(() => {
    fetchAndStoreData()
      .then(() => getArtists())
      .then(setArtists)
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    const newFilter = new Set(filter);
    if (checked) {
      newFilter.add(name as Country);
    } else {
      newFilter.delete(name as Country);
    }

    const country =
      newFilter.size === 1 ? Array.from(newFilter.values())[0] : undefined;
    getArtists(country).then(setArtists);
    setFilter(newFilter);
  };

  return (
    <div className="mx-auto max-w-xl">
      <img src={logo} alt="Sol e Pimenta Lounge Bar" />
      <div className="flex">
        <div>
          <Checkbox
            label="Nacionais"
            name={"Nacional" as Country}
            checked={filter.has("Nacional")}
            onChange={handleFilterChange}
          />
          <Checkbox
            label="Internacionais"
            name={"Internacional" as Country}
            checked={filter.has("Internacional")}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="filter">Localizar</label>
          <input name="filter" id="filter" />
        </div>
      </div>
      <ArtistList loading={loading} artists={artists} />
    </div>
  );
}
