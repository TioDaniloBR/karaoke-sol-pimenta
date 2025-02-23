import { Artist } from "./Artist";
import { Song } from "./Song";

export type ArtistResult = Artist & { id: string; kind: "artist" };
export type SongResult = Song & { id: string; kind: "song" };

export type SearchResult = ArtistResult | SongResult;

export const isArtistResult = (
  result: SearchResult
): result is ArtistResult => {
  return (result as ArtistResult).kind === "artist";
};
