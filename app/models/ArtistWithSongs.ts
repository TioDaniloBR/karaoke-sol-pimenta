import { Artist } from "./Artist";
import { Song } from "./Song";

export type ArtistWithSongs = Artist & { songs: Song[] };
