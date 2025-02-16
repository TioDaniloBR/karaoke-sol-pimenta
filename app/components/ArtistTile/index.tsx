import { Artist } from "../../models/Artist";
import albumNotFound from "../../images/album-not-found.svg";
import { Link } from "@remix-run/react";
export const ArtistTile = ({ artist }: { artist: any }) => {
  return (
    <li key={artist.name}>
      <Link to={`/artist/${artist.name}`}>
        <h2>{artist.name}</h2>
        <img src={artist.image_url || albumNotFound} alt={artist.name} />
      </Link>
    </li>
  );
};
