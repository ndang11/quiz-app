import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/context";
import { LandingCard } from "../../components/LandingCard";

export default function LandingPage() {
  const navigate = useNavigate();
  const { setData } = useData();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // Fetch 10 questions instead of 5
      const url = "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

      if (!url || typeof url !== "string" || !url.startsWith("http")) {
        throw new Error(`Invalid API URL detected: ${url}`);
      }

      console.log("Fetching questions from:", url);

      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Too many requests — please wait a few seconds and try again.");
        }
        throw new Error(`Failed to fetch questions: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();

      if (!json || !Array.isArray(json.results) || json.results.length === 0) {
        throw new Error("No questions returned by the API.");
      }

      const questions = json.results.map((q, i) => ({
        id: i + 1,
        text: q.question,
        correctAnswer: q.correct_answer,
        category: q.category,
        difficulty: q.difficulty,
        answer: null,
      }));

      setData(questions);

      const nextRoute = "/questionnaire/1";

      if (typeof nextRoute !== "string" || !nextRoute.startsWith("/")) {
        throw new Error(`Invalid navigation route: ${nextRoute}`);
      }

      navigate(nextRoute);
    } catch (error) {
      console.error("Fetch or navigation error:", error);
      alert(
        error.message.includes("Invalid URL")
          ? "An invalid URL was used — please refresh and try again."
          : error.message || "Something went wrong while loading questions."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <LandingCard onStart={handleStart} loading={loading} />
    </div>
  );
}
