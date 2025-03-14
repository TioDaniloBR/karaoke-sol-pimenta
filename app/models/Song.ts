import { Artist } from "./Artist";
import { Country } from "./Country";

export type Song = {
  id: string;
  code: string;
  title: string;
  artist: Artist;
  genre?: string; // TODO: remove optionals
  lyricsSnippet: string;
  country: Country;
  pinned?: boolean;
};
