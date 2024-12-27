"use client";
import { createContext, useState } from "react";
import React from "react";

const GlobalContext = createContext<{
  setActiveSection: (e: any) => void;
  activeSection: any;
}>({
  setActiveSection: () => {},
  activeSection: {},
});

export const useGlobal = () => React.useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState({});
  return (
    <GlobalContext.Provider value={{ setActiveSection, activeSection }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
