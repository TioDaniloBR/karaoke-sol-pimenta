import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.svg";
import { Checkbox } from "~/components/Checkbox";
import { Country } from "~/models/Country";
import { ArtistList } from "~/components/ArtistList";
import { useArtists } from "~/hooks/useArtists";
import { ResultList } from "~/components/ResultsList";
import { useSongSearch } from "~/hooks/useSongsSearch";
import SearchIcon from "../images/search.png";

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
      <img
        src={logo}
        className="w-1/2 mx-auto"
        alt="Sol e Pimenta Lounge Bar"
      />
      <div className="grid grid-cols-2 border-secondary rounded-3xl border-2 px-6 py-4 justify-between gap-1 mb-4">
        <Checkbox
          label="Nacionais"
          checked={filters.national}
          onCheckedChange={handleCountryFilter("Nacional")}
          className="col-start-1"
        />
        <Checkbox
          label="Internacionais"
          checked={filters.international}
          onCheckedChange={handleCountryFilter("Internacional")}
          className="col-start-1"
        />
        <label
          htmlFor="filter"
          className="flex gap-2 items-center col-start-2 row-start-1"
        >
          <img className="w-7 h-7" src={SearchIcon} alt="Search" />
          Localizar
        </label>
        <input
          name="filter"
          id="filter"
          className="border-primary border-2 rounded-3xl px-4 col-start-2 h-7"
          onChange={handleSearch}
          value={search}
        />
      </div>
      {search ? (
        <ResultList loading={searchLoading} results={results} />
      ) : (
        <ArtistList loading={loading} artists={artists} />
      )}
    </div>
  );
}
