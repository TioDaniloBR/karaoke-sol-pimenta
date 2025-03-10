import Dexie, { type EntityTable } from "dexie";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";
import { ArtistResult, SearchResult, SongResult } from "~/models/SearchResult";
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
      artists: "id, name, country",
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
    console.log("artist", artistId);
    if (!artist) {
      return null;
    }

    const songs = await this.#db.songs
      .where("artistId")
      .equals(artistId)
      .toArray();

    console.log("songs", songs);
    return {
      ...artist,
      songs,
    };
  };

  getResults = async (search: string): Promise<SearchResult> => {
    const artists = await this.#db.artists
      .filter((artist) =>
        artist.name.toLowerCase().includes(search.toLowerCase())
      )
      .toArray();

    const songs = await this.#db.songs
      .filter((song) => song.title.toLowerCase().includes(search.toLowerCase()))
      .toArray();

    const artistResults: ArtistResult[] = artists.map((artist) => ({
      ...artist,
      id: uuid(),
      kind: "artist",
    }));

    const songResults: SongResult[] = songs.map((song) => ({
      ...song,
      id: uuid(),
      kind: "song",
    }));

    const results = { artistsResult: artistResults, songsResult: songResults };
    return results;
  };
}

const db = new DB();
export { db };
