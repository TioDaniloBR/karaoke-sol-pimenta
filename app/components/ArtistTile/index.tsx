import { Artist } from "../../models/Artist";
import albumNotFound from "../../images/album-not-found.svg";
import { Link } from "@remix-run/react";
import { cn } from "~/utils";
import { useNavigationController } from "~/contexts/NavigationProvider";

type Variant = "small" | "medium";

type Props = {
  artist: Artist;
  variant?: Variant;
};

export const ArtistTile = ({ artist, variant = "small" }: Props) => {
  const { pin } = useNavigationController();

  const imageVariants = {
    small: "w-16 h-16",
    medium: "w-28 h-28",
  };
  const textVariants = {
    small: "text-sm",
    medium: "text-2xl",
  };

  const handlePinArtist = () => {
    //todo - alert user that artist has been pinned
    console.log("Pinned Artist: ", artist);
    pin({ ...artist, kind: "artist" });
  };

  return (
    <div key={artist.name} className={cn("flex gap-6 items-center")}>
      <img
        className={cn("rounded-full object-cover", imageVariants[variant])}
        src={artist.image_url || albumNotFound}
        alt={artist.name}
      />
      <h2 className={cn("", textVariants[variant])}>{artist.name}</h2>
      {variant === "small" && <button onClick={handlePinArtist}>Pin</button>}
    </div>
  );
};
