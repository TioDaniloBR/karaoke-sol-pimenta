import { Artist } from "./Artist";
import { Song } from "./Song";

export type ArtistResult = Artist & { id: string; kind: "artist" };
export type SongResult = Song & { id: string; kind: "song" };

export type SearchResult = {
  artistsResult: ArtistResult[];
  songsResult: SongResult[];
};
