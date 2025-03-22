import { Artist } from "~/models/Artist";
import { ArtistTile } from "../ArtistTile";
import { useNavigate } from "@remix-run/react";
import { Container } from "../Container";
import { useArtists } from "~/contexts/ArtistsProvider";
import { useEffect } from "react";

type Props = {
  loading: boolean;
  artists: Artist[];
};

export const ArtistList = ({ loading, artists }: Props) => {
  const { selectedLetter, position, handlePin, setPosition } = useArtists();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (position && artists.length > 0) {
        window.scrollTo(0, position);
      }
    }
  }, [position, artists]);

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (typeof window !== "undefined") {
      const scrollPosition = window.scrollY;
      setPosition(scrollPosition)
    }
    navigate(path);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  const filteredArtists = artists.filter((artist) => {
    if (selectedLetter === "#") {
      return !/^[A-Z]/i.test(artist.name);
    }
    return artist.name.startsWith(selectedLetter);
  });

  return (
    <>
      <Container className="shadow-blurred">
        <ul className="grid md:grid-cols-2 gap-4">
          {filteredArtists.map((artist) => (
            <li key={artist.id}>
              <ArtistTile
                artist={artist}
                onTileClick={() => handleNavigation(`/artist/${artist.id}`)}
                onPinClick={handlePin}
              />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};
