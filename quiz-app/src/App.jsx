import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";
import ResultsPage from "./pages/ResultPage";
import QuestionPage from "./pages/QuestionPage";
import { UseData } from "./context/context";
import "./App.css";

function App() {
  return (
    <UseData>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questionnaire/:number" element={<QuestionPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </UseData>
  );
}

export default App;
