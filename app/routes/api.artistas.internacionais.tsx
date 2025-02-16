import artists from "../db/internationalArtists.json";

export const loader = async () => {
  return {
    artists,
  };
};
