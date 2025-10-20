// import React from 'react';

// export default function ResultsPage({ answers, restart }) {
//   const score = answers.reduce((count, ans) => (ans.answer === ans.question.correctAnswer ? count + 1 : count), 0);

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Your Results</h1>
//       <p>You scored {score} out of {answers.length}</p>
//       <ul>
//         {answers.map(({ question, answer }, idx) => (
//           <li key={question.id}>
//             {question.text} - Your answer: {answer.toString()} - Correct: {question.correctAnswer.toString()}
//           </li>
//         ))}
//       </ul>
//       <button onClick={restart}>Restart Quiz</button>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/context";
import { getFromStorage } from "../utils/utils";
import styles from "./Resultpage.module.css";

export default function ResultsPage() {
    const { data } = useData(); // Get quiz data from context
    const navigate = useNavigate();
    const [questions, setQuestions] = useState(data || []);

    // Save high scores in localStorage
    function getHighScores() {
        const scores = localStorage.getItem("highScores");
        return scores ? JSON.parse(scores) : [];
    }

    function saveHighScores(scores) {
        localStorage.setItem("highScores", JSON.stringify(scores));
    }

    // Add current score to high scores list and save top 5
    function addNewScore(newScore) {
        let highScores = getHighScores();
        highScores.push(newScore);
        highScores.sort((a, b) => b - a);
        highScores = highScores.slice(0, 5);
        saveHighScores(highScores);
    }

    useEffect(() => {
        if (!data || data.length === 0) {
            const storedData = getFromStorage("questions");
            if (storedData && storedData.length > 0) {
                setQuestions(storedData);
            } else {
                navigate("/");
            }
        } else {
            setQuestions(data);
        }
    }, [data, navigate]);

    if (!questions || questions.length === 0) return <p>Loading results...</p>;

    const totalQuestions = questions.length;
    const correctAnswers = questions.filter((q) => q.answer === q.correct).length;
    const scorePercentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    // Save current score only once when questions load
    useEffect(() => {
        addNewScore(correctAnswers);
    }, [correctAnswers]);

    // Get saved high scores to display
    const [highScores, setHighScores] = useState([]);
    useEffect(() => {
        setHighScores(getHighScores());
    }, []);

    return (
        <div className={styles.container11}>
            <h1 className={styles.title}>Quiz Results</h1>
            <p className={styles.scores}>
                You got <strong>{correctAnswers}</strong> out of <strong>{totalQuestions}</strong> correct.
            </p>
            <p className={styles.scores2}>Your Score: <strong>{scorePercentage}%</strong></p>

            <h2 className={styles.title}>Question Breakdown:</h2>
            <ul>
                {questions.map((q, index) => (
                    <li key={index}>
                        <p>
                            <strong>Q{index + 1}:</strong> {q.text}
                        </p>
                        <p>
                            <strong>Your answer:</strong>{" "}
                            {q.answer === null
                                ? "No answer"
                                : q.answer
                                    ? "True"
                                    : "False"}
                        </p>
                        <p>
                            <strong>Correct answer:</strong> {q.correct ? "True" : "False"}
                        </p>
                    </li>
                ))}
            </ul>

            <button onClick={() => navigate("/")}>Play Again</button>
        </div>
    );
}

