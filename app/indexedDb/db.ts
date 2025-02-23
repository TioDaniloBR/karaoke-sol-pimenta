import Dexie, { type EntityTable } from "dexie";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";
import { ArtistResult, SongResult } from "~/models/SearchResult";
import { Song } from "~/models/Song";
import { v4 as uuid } from "uuid";

class DB {
  #db: Dexie & {
    songs: EntityTable<Song, "code">;
    artists: EntityTable<Artist, "name">;
  };

  constructor() {
    this.#db = new Dexie("karaokeDB") as Dexie & {
      songs: EntityTable<Song, "code">;
      artists: EntityTable<Artist, "name">;
    };
    this.#db.version(1).stores({
      songs: "title, artist, country",
      artists: "name, country",
    });
  }

  #storeSongs = async (songs: Song[]) => {
    await this.#db.songs.bulkPut(songs);
  };

  #storeArtists = async (artists: Artist[]) => {
    await this.#db.artists.bulkPut(artists);
  };

  fetchAndStoreData = async () => {
    const [hasSongs, hasArtists] = await Promise.all([
      this.#db.songs.count(),
      this.#db.artists.count(),
    ]);

    if (hasSongs && hasArtists) return;

    const response = await fetch("/api/data");
    const data = await response.json();

    await Promise.all([
      this.#storeSongs(data.songs),
      this.#storeArtists(data.artists),
    ]);
  };

  getArtists = async (country?: Country) => {
    if (country) {
      return this.#db.artists.where("country").equals(country).toArray();
    }

    return this.#db.artists.toArray();
  };

  getArtist = async (artistName: string) => {
    const artist = await this.#db.artists.get(artistName);
    if (!artist) {
      return null;
    }

    const songs = await this.#db.songs
      .where("artist")
      .equals(artistName)
      .toArray();

    return {
      ...artist,
      songs,
    };
  };

  getArtistsBySearch = async (search: string): Promise<ArtistResult[]> => {
    const artists = await this.#db.artists
      .where(["name"])
      .anyOfIgnoreCase(search)
      .toArray();

    const results: ArtistResult[] = artists.map((artist) => ({
      ...artist,
      id: uuid(),
      kind: "artist",
    }));
    return results;
  };

  getSongsBySearch = async (search: string): Promise<SongResult[]> => {
    const songs = await this.#db.songs
      .where(["title"])
      .anyOfIgnoreCase(search)
      .toArray();

    const id = uuid();
    const results: SongResult[] = songs.map((song) => ({
      ...song,
      id,
      kind: "song",
    }));
    return results;
  };
}

const db = new DB();
export { db };
