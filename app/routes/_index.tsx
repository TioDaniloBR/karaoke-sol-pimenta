import type { MetaFunction } from "@remix-run/node";
import { Checkbox } from "~/components/Checkbox";
import { ArtistList } from "~/components/ArtistList";
import { ResultList } from "~/components/ResultsList";
import SearchIcon from "../images/search.png";
import { Container } from "~/components/Container";
import { useArtists } from "~/contexts/ArtistsProvider";
import { useSongSearch } from "~/contexts/SongSearchProvider";
import { cn } from "~/utils";
import { Link } from "@remix-run/react";
import logo from "~/images/logo.png";
import playlistIcon from "~/images/favorite.png";
import shareIcon from "~/images/share.png";
import { useEffect } from "react";

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
    loading,
    artists,
    filters,
    handleCountryFilter,
    selectedLetter,
    setSelectedLetter,
    fetchArtists,
  } = useArtists();

  useEffect(() => {
    fetchArtists();
  }, []);

  const { handleArtistPin, handleSongPin } = useSongSearch();

  const {
    search,
    results,
    loading: searchLoading,
    handleSearch,
  } = useSongSearch();

  const letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Sol e Pimenta Lounge Bar",
        text: "Venha curtir um som com a gente!",
        url: "https://karaoke-sol-pimenta.vercel.app/",
      });
    }
  };

  return (
    <>
      <header className="bg-body py-5 px-4 flex justify-center">
        <div>
          <img className="w-36" src={logo} alt="Sol e Pimenta Lounge Bar" />
        </div>
        <div className="flex gap-4 absolute right-3">
          <Link to="/playlist">
            <img className="w-8" src={playlistIcon} alt="Sua playlist" />
          </Link>
          <button className="h-8 w-8" onClick={handleShare}>
            <img
              src={shareIcon}
              alt="Clique para compartilhar nossa aplicação"
            />
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-xl p-4 mb-26">
        <div className="sticky top-0 bg-body">
          <Container className="px-6 py-4 mb-4 border-secondary">
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
          {!search && (
            <ul className="flex gap-3 mb-5 overflow-x-auto p-4 scrollbar">
              {letters.map((letter) => (
                <li key={letter}>
                  <button
                    className={cn(letter === selectedLetter && "text-red-500")}
                    onClick={() => setSelectedLetter(letter)}
                  >
                    {letter}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {search ? (
          <ResultList
            loading={searchLoading}
            results={results}
            onSongPin={handleSongPin}
            onArtistPin={handleArtistPin}
          />
        ) : (
          <ArtistList loading={loading} artists={artists} />
        )}
      </main>
    </>
  );
}
