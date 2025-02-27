import { createContext, useContext, useState } from "react";
import { useArtists, UseArtistsReturnType } from "~/hooks/useArtists";
import { useSongSearch, UseSongSearchReturnType } from "~/hooks/useSongsSearch";

type NavigationContextType = {
  selectedLetter: string;
  setSelectedLetter: (l: string) => void;
} & UseArtistsReturnType &
  UseSongSearchReturnType;

const NavigationContext = createContext<NavigationContextType | null>(null);

type Props = {} & React.ComponentProps<"div">;

export const NavigationProvider = ({ children }: Props) => {
  const [selectedLetter, setSelectedLetter] = useState<string>("#");
  const { handleSearch, searchLoading, search, results } = useSongSearch();
  const { loading, artists, filters, handleCountryFilter } = useArtists();

  return (
    <NavigationContext.Provider
      value={{
        selectedLetter,
        setSelectedLetter,
        handleSearch,
        searchLoading,
        search,
        results,
        loading,
        artists,
        filters,
        handleCountryFilter,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationController = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationController must be used within a NavigationProvider"
    );
  }

  return context;
};
