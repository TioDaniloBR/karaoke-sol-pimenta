import { createContext, useContext, useState } from "react";

export type NavigationContextType = {
  selectedLetter: string;
  setSelectedLetter: (l: string) => void;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

type Props = {} & React.ComponentProps<"div">;

export const NavigationProvider = ({ children }: Props) => {
  const [selectedLetter, setSelectedLetter] = useState<string>("#");

  return (
    <NavigationContext.Provider value={{ selectedLetter, setSelectedLetter }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationController = () => {
  return useContext(NavigationContext);
};
