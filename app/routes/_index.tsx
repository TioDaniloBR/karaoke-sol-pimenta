import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.png";
import { Checkbox } from "~/components/Checkbox";
import { ArtistList } from "~/components/ArtistList";
import { ResultList } from "~/components/ResultsList";
import SearchIcon from "../images/search.png";
import { Container } from "~/components/Container";
import { useNavigationController } from "~/contexts/NavigationProvider";

export const meta: MetaFunction = () => {
  return [
    { title: "Sol e Pimenta Lounge Bar" },
    { name: "description", content: "Bem vindos ao nosso bar!" },
    { property: "og:title", content: "Sol e Pimenta Lounge Bar" },
    { property: "og:description", content: "Bem vindos ao nosso bar!" },
    {
      property: "og:image",
      content: "https://karaoke-sol-pimenta.vercel.app/logo-og.png",
    },
    {
      property: "og:url",
      content: "https://karaoke-sol-pimenta.vercel.app/",
    },
    { property: "og:type", content: "website" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
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
  } = useNavigationController();

  return (
    <main className="mx-auto max-w-xl p-4 mb-26">
      <img
        src={logo}
        className="w-1/3 mx-auto mb-2"
        alt="Sol e Pimenta Lounge Bar"
      />
      <Container className="px-6 py-4 mb-4 border-secondary sticky top-0 bg-body">
        <div className="flex justify-between mb-6">
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
            className="col-start-2"
          />
        </div>
        <div className="relative">
          <input
            name="filter"
            id="filter"
            className="w-full border-secondary border rounded-3xl px-4 h-8 placeholder-white"
            onChange={handleSearch}
            placeholder="Procure por músicas ou artistas"
            value={search}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
            <img src={SearchIcon} alt="Limpar busca" />
          </button>
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
