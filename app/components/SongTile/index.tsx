import { Song } from "~/models/Song";
import { CodeBadge } from "../CodeBadge";
import heartFilledIcon from "~/images/heart-filled.png";
import heartBlankIcon from "~/images/heart-blank.svg";

type Props = {
  song: Song;
  onPin: (song: Song) => void;
  variant: "result" | "artistList";
};

export function SongTile({ song, onPin, variant }: Props) {
  const heartIcon = song.pinned ? heartFilledIcon : heartBlankIcon;
  const heartAlt = song.pinned
    ? "Clique para desfavoritar"
    : "Clique para favoritar";

  const description =
    variant === "artistList" ? song.lyricsSnippet : song.artist.name;

  return (
    <li className="flex gap-4 items-center justify-between">
      <div className="flex gap-3 items-center">
        <CodeBadge>{song.code}</CodeBadge>
        <div>
          <h2 className="">{song.title}</h2>
          <p className="text-ellipsis text-sm">{description}</p>
        </div>
      </div>
      <button onClick={() => onPin(song)}>
        <img src={heartIcon} alt={heartAlt} />
      </button>
    </li>
  );
}
