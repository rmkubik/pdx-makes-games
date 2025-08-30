import React, {
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";

type LayoutContextType = {
  appMaxWidth: number;
  setAppMaxWidth: React.Dispatch<React.SetStateAction<number>>;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: PropsWithChildren) => {
  const [appMaxWidth, setAppMaxWidth] = useState(650);

  return (
    <LayoutContext.Provider value={{ appMaxWidth, setAppMaxWidth }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
};
