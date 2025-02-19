import nationalSongs from "../db/songs-nationals.json";
import nationalArtists from "../db/artists-national.json";
import internationalSongs from "../db/songs-internationals.json";
import internationalArtists from "../db/artists-international.json";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";

const fetchArtists = () => {
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

const fetchSongs = () => {
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

export const loader = () => {
  const songs = fetchSongs();
  const artists = fetchArtists();

  return { songs, artists };
};
