import { Artist } from "./Artist";
import { Song } from "./Song";

export type ArtistResult = Artist & { kind: "artist" };
export type SongResult = Song & { kind: "song" };

export type SearchResult = {
  artistsResult: ArtistResult[];
  songsResult: SongResult[];
};
