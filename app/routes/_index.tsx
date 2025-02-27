import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.svg";
import { Checkbox } from "~/components/Checkbox";
import { ArtistList } from "~/components/ArtistList";
import { ResultList } from "~/components/ResultsList";
import SearchIcon from "../images/search.png";
import { Container } from "~/components/Container";
import { useNavigationController } from "~/contexts/NavigationProvider";

export const meta: MetaFunction = () => {
  return [
    { title: "Sol e Pimenta" },
    { name: "description", content: "Bem vindos ao nosso bar!" },
  ];
};

export default function Index() {
  const {
    handleSearch,
    searchLoading,
    search,
    results,
    loading,
    artists,
    filters,
    handleCountryFilter,
    resetSearch,
  } = useNavigationController();

  return (
    <main className="mx-auto max-w-xl p-4">
      <img
        src={logo}
        className="w-1/2 mx-auto"
        alt="Sol e Pimenta Lounge Bar"
      />
      <Container className="grid md:grid-cols-2 justify-between gap-1 mb-4 border-secondary">
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
          className="flex gap-2 items-center md:col-start-2 md:row-start-1 mt-2 md:m-0"
        >
          <img className="w-7 h-7" src={SearchIcon} alt="Search" />
          Localizar
        </label>
        <div className="relative">
          <input
            name="filter"
            id="filter"
            className="w-full border-primary border-2 rounded-3xl px-4 md:col-start-2 h-7"
            onChange={handleSearch}
            value={search}
          />
          {search && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 border rounded-full w-4 h-4 flex items-center justify-center"
              onClick={resetSearch}
            >
              x
            </button>
          )}{" "}
        </div>
      </Container>
      {search ? (
        <ResultList loading={searchLoading} results={results} />
      ) : (
        <ArtistList loading={loading} artists={artists} />
      )}
    </main>
  );
}
