import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.png";
import { Checkbox } from "~/components/Checkbox";
import { Country } from "~/models/Country";
import { ArtistList } from "~/components/ArtistList";
import { useArtists } from "~/hooks/useArtists";
import { ResultList } from "~/components/ResultsList";
import { useSongSearch } from "~/hooks/useSongsSearch";

export const meta: MetaFunction = () => {
  return [
    { title: "Sol e Pimenta" },
    { name: "description", content: "Bem vindos ao nosso bar!" },
  ];
};

export default function Index() {
  const { loading, artists, filters, handleCountryFilter } = useArtists();
  const {
    handleSearch,
    loading: searchLoading,
    search,
    results,
  } = useSongSearch();

  return (
    <div className="mx-auto max-w-xl">
      <img src={logo} alt="Sol e Pimenta Lounge Bar" />
      <div className="flex">
        <div>
          <Checkbox
            label="Nacionais"
            name={"Nacional" as Country}
            checked={filters.national}
            onChange={handleCountryFilter}
          />
          <Checkbox
            label="Internacionais"
            name={"Internacional" as Country}
            checked={filters.international}
            onChange={handleCountryFilter}
          />
        </div>
        <div>
          <label htmlFor="filter">Localizar</label>
          <input
            name="filter"
            id="filter"
            onChange={handleSearch}
            value={search}
          />
        </div>
      </div>
      {search ? (
        <ResultList loading={searchLoading} results={results} />
      ) : (
        <ArtistList loading={loading} artists={artists} />
      )}
    </div>
  );
}
