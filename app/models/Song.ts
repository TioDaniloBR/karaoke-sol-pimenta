import { Country } from "./Country";

export type Song = {
  code: string;
  title: string;
  artist: string;
  genre?: string; // TODO: remove optionals
  lyricsSnippet: string;
  country: Country;
};
