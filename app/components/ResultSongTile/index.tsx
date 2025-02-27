import { Song } from "~/models/Song";
import albumNotFound from "~/images/album-not-found.svg";
import { cn } from "~/utils";

type Props = {
  song: Song;
};

export function ResultSongTile({ song }: Props) {
  return (
    <div className="flex gap-4 justify-between">
      <div className="flex gap-2">
        <img
          className={cn("rounded-full object-cover w-16 h-16")}
          src={song.artist.image_url || albumNotFound}
          alt={song.artist.name}
        />
        <div>
          <h2 className="text-xl">{song.title}</h2>
          <p>{song.artist.name}</p>
        </div>
      </div>
      <span className="bg-secondary p-2 text-black rounded-full w-20 text-center font-bold tracking-widest flex items-center justify-center">
        {song.code}
      </span>
    </div>
  );
}
