import { Artist } from "../../models/Artist";
import albumNotFound from "../../images/album-not-found.svg";
import { Link } from "@remix-run/react";

type Variant = "small" | "medium";

type Props = {
  artist: Artist;
  variant: Variant;
};

export const ArtistTile = ({ artist }: Props) => {
  return (
    <li key={artist.name}>
      <Link
        to={`/artist/${artist.name}`}
        className="w-full flex gap-2 max-w-72 items-center"
      >
        <img
          className="rounded-full w-16 h-16"
          src={artist.image_url || albumNotFound}
          alt={artist.name}
        />
        <h2>{artist.name}</h2>
      </Link>
    </li>
  );
};
