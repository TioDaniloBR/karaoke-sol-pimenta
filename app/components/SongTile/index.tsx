import { Song } from "~/models/Song";

type Props = {
  song: Song;
};

export function SongTile({ song }: Props) {
  return (
    <li className="flex gap-4">
      <span className="bg-secondary p-2 text-black rounded-full w-20 text-center font-bold tracking-widest flex items-center justify-center">
        {song.code}
      </span>
      <div>
        <h2 className="text-xl">{song.title}</h2>
        <p>{song.lyricsSnippet}...</p>
      </div>
    </li>
  );
}
