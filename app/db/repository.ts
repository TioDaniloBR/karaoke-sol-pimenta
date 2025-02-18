import nationalSongs from "./songs-nationals.json";
import nationalArtists from "./artists-national.json";
import internationalSongs from "./songs-internationals.json";
import internationalArtists from "./artists-international.json";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";

export const fetchArtists = () => {
  const national: Artist[] = nationalArtists.map((artist) => ({
    ...artist,
    country: "Nacional",
  }));

  const international: Artist[] = internationalArtists.map((artist) => ({
    ...artist,
    country: "Internacional",
  }));

  return [...national, ...international].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

export const fetchSongs = () => {
  const nationals = nationalSongs.map((song) => ({
    ...song,
    country: "Nacional" as Country,
  }));
  const internationals = internationalSongs.map((song) => ({
    ...song,
    country: "Internacional" as Country,
  }));

  return [...nationals, ...internationals];
};

// TODO: going to delete this soon enough
export const getArtist = (artistName: string) => {
  const artist = fetchArtists().find((artist) => artist.name === artistName);
  if (!artist) {
    return null;
  }
  const songBase =
    artist.country === "Nacional" ? nationalSongs : internationalSongs;

  const songs = songBase
    .map((song) => ({ ...song, country: artist.country }))
    .filter((song) => song.artist === artistName);

  return {
    ...artist,
    songs,
  };
};
