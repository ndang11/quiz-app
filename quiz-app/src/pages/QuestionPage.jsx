import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Timer from './Timer';

export default function QuestionPage({ questions, questionIndex, onAnswer }) {
  const { index } = useParams();
  const navigate = useNavigate();
  const [answered, setAnswered] = useState(false);

  const question = questions[questionIndex];

  useEffect(() => {
    setAnswered(false); // reset answer state when question changes
  }, [questionIndex]);

  const handleAnswer = (answer) => {
    if (!answered) {
      setAnswered(true);
      onAnswer(answer);
      if (questionIndex + 1 >= questions.length) {
        navigate('/results');
      } else {
        navigate(`/question/${questionIndex + 1}`);
      }
    }
  };

  const onTimeout = () => {
    handleAnswer(false);
  };

  if (!question) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>Question {questionIndex + 1} of {questions.length}</h2>
      <p>{question.text}</p>
      <button onClick={() => handleAnswer(true)}>True</button>
      <button onClick={() => handleAnswer(false)}>False</button>
      <Timer duration={15} onTimeout={onTimeout} />
    </div>
  );
}
