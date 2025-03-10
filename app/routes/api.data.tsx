import jsonSongs from "../db/songs.json";
import jsonArtists from "../db/artists.json";
import { Artist } from "~/models/Artist";
import { countrySchema } from "~/models/Country";
import { z } from "zod";
import { DBSong } from "~/indexedDb/db";

const ApiArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: countrySchema,
  image_url: z.string().nullable(),
});

const ApiArtistSchemaCollection = z.array(ApiArtistSchema);

const ApiSongSchema = z.array(
  z.object({
    code: z.string(),
    title: z.string(),
    artistName: z.string(),
    lyricsSnippet: z.string(),
    image_url: z.string().nullable(),
    country: countrySchema,
    artist: ApiArtistSchema,
    artistId: z.string(),
  })
);

export const loader = (): { songs: DBSong[]; artists: Artist[] } => {
  const artists = ApiArtistSchemaCollection.parse(jsonArtists);
  const songs = ApiSongSchema.parse(jsonSongs);

  return { songs, artists };
};
