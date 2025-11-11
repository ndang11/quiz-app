import React from "react";
import styles from "./LandingCard.module.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/context";
import he from "he";

export function LandingCard({ isLoading }) {
  const navigate = useNavigate();
  const { setData } = useData();

  const handleStart = async () => {
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
      );

      if (!res.ok) throw new Error("Failed to fetch questions");

      const json = await res.json();

      const questions = json.results.map((q) => ({
        text: he.decode(q.question), 
        correct: q.correct_answer === "True",
        answer: null,
      }));

      setData(questions);
      navigate("/questionnaire/1");
    } catch (error) {
      console.error(error);
      alert("Failed to load questions. Please try again in a moment.");
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles["card-box"]}>
        <div className={styles.row}>
          <h1>
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/glyph-neue/64/ask-question--v1.png"
              alt="ask-question--v1"
            />
            Welcome To My Quiz Game
          </h1>
        </div>

        <div className={styles.row}>
          <ol>
            <li>You will be given 10 questions to answer</li>
            <li>
              Each question is to be answered in 15 seconds and if after 15 seconds you
              haven’t answered, it automatically moves to another question
            </li>
            <li>Answer (True or False)</li>
            <li>
              <strong>NB:</strong> A question passed without being answered awards no point
            </li>
          </ol>

          <button className={styles.btn} onClick={handleStart} disabled={isLoading}>
            {isLoading ? "Loading..." : "Start Game"}
          </button>
        </div>
      </div>
    </div>
  );
}
