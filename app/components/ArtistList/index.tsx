import { Artist } from "~/models/Artist";
import { ArtistTile } from "../ArtistTile";
import { useNavigate } from "@remix-run/react";
import { Container } from "../Container";
import { useNavigationController } from "~/contexts/NavigationProvider";

type Props = {
  loading: boolean;
  artists: Artist[];
};

export const ArtistList = ({ loading, artists }: Props) => {
  const { selectedLetter, handlePin } = useNavigationController();
  const navigate = useNavigate();

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
                onTileClick={() => navigate(`/artist/${artist.id}`)}
                onPinClick={() => handlePin(artist)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};
