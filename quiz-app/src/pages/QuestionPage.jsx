
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "./Timer";
import { useData } from "../context/context";
import styles from "./questionpage.module.css";


export default function QuestionPage() {
  const { number } = useParams(); // question number from URL
  const questionIndex = parseInt(number, 10) - 1;
  const navigate = useNavigate();
  const { data: questions, setData } = useData();

  const [answered, setAnswered] = useState(false);

  // Reset answered whenever question changes
  useEffect(() => {
    setAnswered(false);
  }, [questionIndex]);

  // Redirect if no questions
  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/");
    }
  }, [questions, navigate]);

  if (!questions || !questions[questionIndex]) return <p>Loading question...</p>;

  const question = questions[questionIndex];

  const handleAnswer = (answer) => {
    if (answered) return; // prevent multiple answers
    setAnswered(true);

    // Save answer in context
    setData((prev) => {
      const updated = [...prev];
      updated[questionIndex] = { ...updated[questionIndex], answer };
      return updated;
    });

    // Delay navigation slightly for UX smoothness
    setTimeout(() => {
      if (questionIndex + 1 >= questions.length) {
        navigate("/results");
      } else {
        navigate(`/questionnaire/${questionIndex + 2}`);
      }
    }, 500);
  };

  const handleTimeout = () => {
    if (!answered) handleAnswer(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Question {questionIndex + 1} of {questions.length}
      </h2>
      <p className={styles.para}>{question.text}</p>

      <div className={styles.btnContainer}>
        <button className={styles.btn1} onClick={() => handleAnswer(true)} disabled={answered}>
          True
        </button>
        <button className={styles.btn2} onClick={() => handleAnswer(false)} disabled={answered}>
          False
        </button>
      </div>

      {/* Each question has its own timer */}
      <Timer
        key={questionIndex}  
        duration={15}           
        onTimeout={handleTimeout}  
        questionIndex={questionIndex}
      />
    </div>
  );
}

