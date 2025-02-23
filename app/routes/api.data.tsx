import jsonSongs from "../db/songs.json";
import { Artist } from "~/models/Artist";
import { Song } from "~/models/Song";
import { countrySchema } from "~/models/Country";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { DBSong } from "~/indexedDb/db";

const ApiSongSchema = z.array(
  z.object({
    code: z.string().or(z.number()),
    title: z.string().or(z.number()),
    artistName: z.string().or(z.number()),
    lyricsSnippet: z.string(),
    image_url: z.string().nullable(),
    country: countrySchema,
  })
);

export const loader = (): { songs: DBSong[]; artists: Artist[] } => {
  const artists: Artist[] = [];
  const apiSongs = ApiSongSchema.parse(jsonSongs);
  const songs = apiSongs.map((song) => {
    const { artistName, image_url, code, ...dataSong } = song;
    let artist = artists.find((a) => a.name === artistName);
    if (!artist) {
      const newArtist = {
        name: String(artistName),
        image_url: image_url,
        country: song.country,
        id: String(artistName),
      };
      artists.push(newArtist);
      artist = newArtist;
    }

    return {
      ...dataSong,
      code: String(code),
      title: String(song.title),
      artistId: artist.id,
      artist,
    };
  });

  return { songs, artists };
};
