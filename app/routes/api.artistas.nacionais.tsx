import { LoaderFunction } from "@remix-run/node";
import songs from "../db/internacionais.json";

export const loader: LoaderFunction = async ({ params }) => {
  return {
    songs,
  };
};
