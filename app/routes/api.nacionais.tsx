import songs from "../db/nacionais.json";

export const loader = async () => {
  return {
    songs,
  };
};
