import songs from "../db/internacionais.json";

export const loader = async () => {
  return {
    songs,
  };
};
