import React from "react";

export function LandingCard({ navig, isLoading }) {
  return (
    <div className="box">
      <div className="card-box">
        <div className="row">
          <h1>Welcome to my quiz app</h1>
        </div>
        <div className="row">
          <ol>
            <li>You will be given 10 questions to answer</li>
            <li>
              Each question is to be answered in 15 second and if after 15 seconds you
              <br />
              haven't answered the question, it automatically moves to another question
            </li>
            <li>Answer (True or False)</li>
            <li>
              <strong>NB:</strong> A question pass without being answered awards no point
            </li>
          </ol>
        </div>
        <div className="row">
          <button
            disabled={isLoading}
            onClick={() => navig()}
            className={isLoading ? "btn-disabled" : "btn-bouton"}
          >
            Start game
          </button>
        </div>
      </div>
    </div>
  );
}
