import { Artist } from "../../models/Artist";
import albumNotFound from "../../images/album-not-found.svg";
import { cn } from "~/utils";
import heartFilledIcon from "~/images/heart-filled.png";
import heartBlankIcon from "~/images/heart-blank.svg";

type Variant = "small" | "medium";

type Props = {
  artist: Artist;
  variant?: Variant;
  onTileClick?: (id: string) => void;
  onPinClick?: (artist: Artist) => void;
};

export const ArtistTile = ({
  artist,
  onTileClick,
  onPinClick,
  variant = "small",
}: Props) => {
  const imageVariants = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
  };
  const textVariants = {
    small: "text-sm",
    medium: "text-2xl",
  };

  const heartIcon = artist.pinned ? heartFilledIcon : heartBlankIcon;
  const heartAlt = artist.pinned
    ? "Clique para desfavoritar"
    : "Clique para favoritar";

  const handleTileClick = () => {
    if (onTileClick) onTileClick(artist.id);
  };

  const handlePinClick = () => {
    if (onPinClick) onPinClick(artist);
  };

  return (
    <div key={artist.name} className="flex justify-between w-">
      <div className={cn("flex gap-6 items-center")} onClick={handleTileClick}>
        <img
          className={cn("rounded-full object-cover", imageVariants[variant])}
          src={artist.image_url || albumNotFound}
          alt={artist.name}
        />
        <h2 className={cn("", textVariants[variant])}>{artist.name}</h2>
      </div>
      {variant === "small" && (
        <button onClick={handlePinClick}>
          <img src={heartIcon} alt={heartAlt} />
        </button>
      )}
    </div>
  );
};
