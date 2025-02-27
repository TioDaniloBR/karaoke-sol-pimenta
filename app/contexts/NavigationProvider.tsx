import { createContext, useContext, useState } from "react";
import { useSongSearch } from "~/hooks/useSongsSearch";
import { SearchResult } from "~/models/SearchResult";

type NavigationContextType = {
  selectedLetter: string;
  setSelectedLetter: (l: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchLoading: boolean;
  search: string;
  results: SearchResult | null;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

type Props = {} & React.ComponentProps<"div">;

export const NavigationProvider = ({ children }: Props) => {
  const [selectedLetter, setSelectedLetter] = useState<string>("#");
  const { handleSearch, loading, search, results } = useSongSearch();

  return (
    <NavigationContext.Provider
      value={{
        selectedLetter,
        setSelectedLetter,
        handleSearch,
        searchLoading: loading,
        search,
        results,
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
