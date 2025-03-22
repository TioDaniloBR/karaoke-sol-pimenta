import { CheckedState } from "@radix-ui/react-checkbox";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "~/indexedDb/db";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";

type UseArtistsReturnType = {
  selectedLetter: string;
  setSelectedLetter: (letter: string) => void;
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
  handlePin: (artist: Artist) => void;
  fetchArtists: () => void;
  position: number;
  setPosition: (position: number) => void;
};

const ArtistsContext = createContext<UseArtistsReturnType | null>(null);

type Props = {} & React.ComponentProps<"div">;

export const ArtistsProvider = ({ children }: Props) => {
  const [selectedLetter, setSelectedLetter] = useState<string>("#");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(new Set<Country>());
  const [position, setPosition] = useState(0);

  const fetchArtists = () => {
    setLoading(true);
    db.fetchAndStoreData()
      .then(() => db.getArtists())
      .then(setArtists)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArtists();
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

  const handlePin = async (artist: Artist) => {
    const newArtists = artists.slice();
    const existentArtist = newArtists.find((a) => a.id === artist.id);
    if (!existentArtist) return;

    await db.togglePinArtist(artist);
    setArtists(newArtists);
  };

  const filters = {
    national: filter.has("Nacional"),
    international: filter.has("Internacional"),
    search: "",
  };

  return (
    <ArtistsContext.Provider
      value={{
        selectedLetter,
        setSelectedLetter,
        loading,
        artists,
        filters,
        handlePin,
        handleCountryFilter,
        fetchArtists,
        position,
        setPosition,
      }}
    >
      {children}
    </ArtistsContext.Provider>
  );
};

export const useArtists = () => {
  const context = useContext(ArtistsContext);
  if (!context) {
    throw new Error("useArtists must be used within a NavigationProvider");
  }

  return context;
};
