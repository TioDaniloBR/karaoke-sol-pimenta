import { Artist } from "~/models/Artist";
import { ArtistTile } from "../ArtistTile";
import { Link } from "@remix-run/react";
import { cn } from "~/utils";
import { Container } from "../Container";
import {
  NavigationContextType,
  useNavigationController,
} from "~/contexts/NavigationProvider";

type Props = {
  loading: boolean;
  artists: Artist[];
};

export const ArtistList = ({ loading, artists }: Props) => {
  const { selectedLetter, setSelectedLetter } =
    useNavigationController() as NavigationContextType;

  if (loading) {
    return <div>Carregando...</div>;
  }

  const letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const filteredArtists = artists.filter((artist) => {
    if (selectedLetter === "#") {
      return !/^[A-Z]/i.test(artist.name);
    }
    return artist.name.startsWith(selectedLetter);
  });
  return (
    <>
      <ul className="flex gap-3 mb-5 overflow-x-auto p-4 scrollbar">
        {letters.map((letter) => (
          <li key={letter}>
            <button
              className={cn(letter === selectedLetter && "text-primary")}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          </li>
        ))}
      </ul>
      <Container className="shadow-blurred">
        <ul className="grid md:grid-cols-2 gap-4">
          {filteredArtists.map((artist) => (
            <li key={artist.id}>
              <Link to={`/artist/${artist.id}`} key={artist.id}>
                <ArtistTile artist={artist} />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};
