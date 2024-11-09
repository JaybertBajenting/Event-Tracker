import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ActiveComponentContextProps {
  activeComponent: React.ReactNode;
  setActiveComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setAndStoreActiveComponent: (e: string) => void;
}

const ActiveComponentContext = createContext<ActiveComponentContextProps | undefined>(undefined);

export const ActiveComponentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>('HomePage');

  const setAndStoreActiveComponent = (e: string) => {
    setActiveComponent(e);
    localStorage.setItem("activeComponent", e);
  };

  
  useEffect(() => {
    const storedActiveComponent = localStorage.getItem("activeComponent");

    if (storedActiveComponent) {
      setAndStoreActiveComponent(storedActiveComponent);
    }
  }, []);

  return (
    <ActiveComponentContext.Provider value={{ activeComponent, setActiveComponent, setAndStoreActiveComponent }}>
      {children}
    </ActiveComponentContext.Provider>
  );
};





export const useActiveComponent = () => {
  const context = useContext(ActiveComponentContext);

  if (!context) {
    throw new Error('useActiveComponent must be used within an ActiveComponentProvider');
  }

  return context;
};
