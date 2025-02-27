import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { db } from "~/indexedDb/db";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";

export type UseArtistsReturnType = {
  artists: Artist[];
  loading: boolean;
  filters: {
    national: boolean;
    international: boolean;
    search: string;
  };
  handleCountryFilter: (
    countryName: Country
  ) => (checked: CheckedState) => void;
};

export const useArtists = (): UseArtistsReturnType => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(new Set<Country>());

  useEffect(() => {
    db.fetchAndStoreData()
      .then(() => db.getArtists())
      .then(setArtists)
      .finally(() => setLoading(false));
  }, []);

  const handleCountryFilter = (countryName: Country) => {
    return (checked: CheckedState) => {
      const newFilter = new Set<Country>();
      if (checked) {
        newFilter.add(countryName);
      }

      const country =
        newFilter.size === 1 ? Array.from(newFilter.values())[0] : undefined;
      db.getArtists(country).then(setArtists);
      setFilter(newFilter);
    };
  };

  const filters = {
    national: filter.has("Nacional"),
    international: filter.has("Internacional"),
    search: "",
  };

  return {
    artists,
    loading,
    filters,
    handleCountryFilter,
  };
};
