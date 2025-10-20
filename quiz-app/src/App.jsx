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
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Quiz questions */}
        <Route path="/questionnaire/:number" element={<QuestionPage />} />

        {/* Results page */}
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </UseData>
  );
}

export default App;
