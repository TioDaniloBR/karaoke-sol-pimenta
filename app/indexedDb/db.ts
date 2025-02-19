import Dexie, { type EntityTable } from "dexie";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";
import { Song } from "~/models/Song";

export const db = new Dexie("karaokeDB") as Dexie & {
  songs: EntityTable<Song, "code">;
  artists: EntityTable<Artist, "name">;
};

db.version(1).stores({
  songs: "title, artist, country, lyricsSnippet",
  artists: "name, country",
});

export const storeSongs = async (songs: Song[]) => {
  await db.songs.bulkPut(songs);
};

export const storeArtists = async (artists: Artist[]) => {
  await db.artists.bulkPut(artists);
};

export const fetchAndStoreData = async () => {
  const [hasSongs, hasArtists] = await Promise.all([
    db.songs.count(),
    db.artists.count(),
  ]);

  if (hasSongs && hasArtists) return;

  const response = await fetch("/api/data");
  const data = await response.json();

  await Promise.all([storeSongs(data.songs), storeArtists(data.artists)]);
};

export const getArtists = async (country?: Country) => {
  if (country) {
    return db.artists.where("country").equals(country).toArray();
  }

  return db.artists.toArray();
};

export const getArtist = async (artistName: string) => {
  const artist = await db.artists.get(artistName);
  if (!artist) {
    return null;
  }

  const songs = await db.songs.where("artist").equals(artistName).toArray();

  return {
    ...artist,
    songs,
  };
};
