import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultPage';
import QuestionPage from './pages/QuestionPage';
import { UseData } from './context/context';

function App() {
  return (
    <UseData>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/QuestionPage/:number"
            element={<QuestionPage/>}
          />
          <Route path="/ResultPage" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </UseData>
  );
}

export default App;