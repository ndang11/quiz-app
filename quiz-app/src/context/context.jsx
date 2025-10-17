import { createContext, useState } from "react";

export const DataContext = createContext();

export function UseData({ children }) {
  const [tabQuestions, setQuestions] = useState([]);
  const [tabReponse, setTabReponse] = useState([]);

  return (
    <DataContext.Provider
      value={{ tabQuestions, tabReponse, setTabReponse, setQuestions }}
    >
      {children}
    </DataContext.Provider>
  );
}
