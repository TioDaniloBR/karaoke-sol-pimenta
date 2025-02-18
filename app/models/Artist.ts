import { Country } from "./Country";

export type Artist = {
  name: string;
  image_url: string | null;
  country: Country;
};
