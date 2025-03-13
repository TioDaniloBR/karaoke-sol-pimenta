import { Song } from "~/models/Song";
import { CodeBadge } from "../CodeBadge";

type Props = {
  song: Song;
};

export function SongTile({ song }: Props) {
  return (
    <li className="flex gap-4 items-center">
      <CodeBadge>{song.code}</CodeBadge>
      <div>
        <h2 className="text-xl">{song.title}</h2>
        <p className="text-ellipsis">{song.lyricsSnippet}</p>
      </div>
    </li>
  );
}
