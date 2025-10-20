// import { useNavigate } from "react-router";
// import { useEffect, useContext, useState } from 'react'
// import { getQuestion } from "../services/api";
// import { useData } from "../context/context";
// import { saveToStorage } from "../utils";
// import { LandingCard } from "../components/LandingCard";

// export default function LandingPage() {
//   const navigate = useNavigate()
//   const [isLoading, setIsLoading] = useState(true)

//   const handleNaviagte = () => {
//     navigate("/questionnaire/1")
//   }

//   const { setQuestions } = useContext(DataContext)

//   useEffect(() => {
//     handleGetQuextion();
//   }, [])

//   const handleGetQuextion = () => {
//     setIsLoading(true);
//     getQuestion().then(data => {
//       if (data) {
//         setQuestions(data);
//         saveToStorage("questions", data);
//       }
//     }).finally(() => {
//       setIsLoading(false);
//     })
//   }

//   return (
//     <LandingCard isLoading={isLoading} navig={handleNaviagte} />
//   )
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/context";
import { LandingCard } from "../../components/LandingCard";



export default function LandingPage() {
  const navigate = useNavigate();
  const { setData } = useData();

  const handleStart = async () => {
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
      );

      if (!res.ok) throw new Error("Failed to fetch questions");

      const json = await res.json();

      // Map API data into our format
      const questions = json.results.map((q) => ({
        text: q.question,
        answer: null, // store user answer later
      }));

      setData(questions); // store in context
      navigate("/questionnaire/1"); // start quiz
    } catch (error) {
      console.error(error);
      alert(
        "Failed to load questions. The API may be busy. Try again in a moment."
      );
    }
  };

  return (
    <div>
      <LandingCard />
    </div>
  );
}
