/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";

interface hooksStateValue {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const hooksState = createContext<hooksStateValue | undefined>(undefined);

export const HookProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <hooksState.Provider
      value={{
        fullScreen,
        setFullScreen
      }}
    >
      {children}
    </hooksState.Provider>
  );
};

// Buat custom hook untuk menggunakan context
export const useContextApp = () => {
  const context = useContext(hooksState);
  if (!context) {
    throw new Error("useActiveChat must be used within a HookProvider");
  }
  return context;
};
