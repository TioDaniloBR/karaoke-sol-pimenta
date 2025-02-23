import Dexie, { type EntityTable } from "dexie";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";
import { ArtistResult, SongResult } from "~/models/SearchResult";
import { Song } from "~/models/Song";
import { v4 as uuid } from "uuid";
import { ArtistWithSongs } from "~/models/ArtistWithSongs";

export type DBSong = Song & {
  artistId: string;
};

class DB {
  #db: Dexie & {
    songs: EntityTable<DBSong, "code">;
    artists: EntityTable<Artist, "id">;
  };

  constructor() {
    this.#db = new Dexie("karaokeDB") as Dexie & {
      songs: EntityTable<DBSong, "code">;
      artists: EntityTable<Artist, "id">;
    };
    this.#db.version(1).stores({
      songs: "code, artistId, title, country",
      artists: "name, country",
    });
  }

  #storeSongs = async (songs: DBSong[]) => {
    const songsToStore = songs.map((song) => ({
      ...song,
    }));
    await this.#db.songs.bulkPut(songsToStore);
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
    const data: { songs: DBSong[]; artists: Artist[] } = await response.json();
    await this.#storeArtists(data.artists);
    await this.#storeSongs(data.songs);
  };

  getArtists = async (country?: Country) => {
    if (country) {
      return this.#db.artists.where("country").equals(country).toArray();
    }

    return this.#db.artists.toArray();
  };

  getArtist = async (artistId: string): Promise<ArtistWithSongs | null> => {
    const artist = await this.#db.artists.get(artistId);
    if (!artist) {
      return null;
    }

    const songs = await this.#db.songs
      .where("artistId")
      .equals(artistId)
      .toArray();

    return {
      ...artist,
      songs,
    };
  };

  getArtistsBySearch = async (search: string): Promise<ArtistResult[]> => {
    const artists = await this.#db.artists
      .filter((artist) =>
        artist.name.toLowerCase().includes(search.toLowerCase())
      )
      .toArray();

    const results: ArtistResult[] = artists.map((artist) => ({
      ...artist,
      id: uuid(),
      kind: "artist",
    }));
    console.log("artists", results);
    return results;
  };

  getSongsBySearch = async (search: string): Promise<SongResult[]> => {
    const songs = await this.#db.songs
      .where("title")
      .anyOfIgnoreCase(search)
      .toArray();

    const results: SongResult[] = songs.map((song) => ({
      ...song,
      id: uuid(),
      kind: "song",
    }));
    return results;
  };
}

const db = new DB();
export { db };
