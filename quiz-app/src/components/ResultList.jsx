import React from "react";
import he from "he";

export function ResultList({ tabResponse, score, star }) {
  function escapeHtml(word) {
    return he.decode(word);
  }

  const totalQuestions = tabResponse.length || 10; // fallback to 10 if no data
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div>
      <div>
        <h2>Scored : {score} / {totalQuestions}</h2>
        <h3>Percentage: {percentage}%</h3>
        {score > totalQuestions / 2 ? (
          <h2>You Won</h2>
        ) : (
          <h2>You Lose</h2>
        )}
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Correct answer</th>
              <th>Your answer</th>
            </tr>
          </thead>
          <tbody>
            {tabResponse.map((item, index) => (
              <tr key={index + 1}>
                <td>{escapeHtml(item.question)}</td>
                <td>{item.correct_answer}</td>
                <td>{item.yours}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={star}>Restart</button>
        </div>
      </div>
    </div>
  );
}
