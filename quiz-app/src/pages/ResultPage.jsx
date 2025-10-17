import React from 'react';

export default function ResultsPage({ answers, restart }) {
  const score = answers.reduce((count, ans) => (ans.answer === ans.question.correctAnswer ? count + 1 : count), 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Results</h1>
      <p>You scored {score} out of {answers.length}</p>
      <ul>
        {answers.map(({ question, answer }, idx) => (
          <li key={question.id}>
            {question.text} - Your answer: {answer.toString()} - Correct: {question.correctAnswer.toString()}
          </li>
        ))}
      </ul>
      <button onClick={restart}>Restart Quiz</button>
    </div>
  );
}
