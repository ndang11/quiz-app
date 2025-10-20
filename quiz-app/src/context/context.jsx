import React, { createContext, useContext, useState } from "react";

// Exported so it can be used directly if needed
export const DataContext = createContext();

export function UseData({ children }) {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook for convenient usage
export function useData() {
  return useContext(DataContext);
}
