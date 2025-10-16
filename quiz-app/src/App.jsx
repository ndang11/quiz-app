import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import QuestionPage from './components/QuestionPage';
import ResultsPage from './components/ResultsPage';

export default class App extends Component {
  state = {
    questions: [],
    answers: [],
    currentQuestionIndex: 0,
    gameStarted: false,
    results: null
  };

  startGame = () => {
    this.setState({ gameStarted: true });
  };

  handleAnswer = (answer) => {
    const { questions, answers, currentQuestionIndex } = this.state;
    const newAnswers = [...answers, { question: questions[currentQuestionIndex], answer }];
    if (currentQuestionIndex + 1 < questions.length) {
      this.setState({ answers: newAnswers, currentQuestionIndex: currentQuestionIndex + 1 });
    } else {
      // Calculate results here if needed
      this.setState({ answers: newAnswers, gameStarted: false, results: newAnswers });
    }
  };

  getQuestions = (questions) => {
    this.setState({ questions });
  };

  render() {
    const { questions, currentQuestionIndex, gameStarted, answers, results } = this.state;
    return (
      <Router>
        <Routes>
          <Route path="/" element={
            <LandingPage startGame={this.startGame} questions={questions} getQuestions={this.getQuestions} />
          } />
          <Route path="/question/:index" element={
            questions.length > 0 ? (
              <QuestionPage
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                handleAnswer={this.handleAnswer}
              />
            ) : (
              <Navigate to="/" />
            )
          } />
          <Route path="/results" element={
            results ? (
              <ResultsPage answers={answers} restart={() => this.setState({ questions: [], answers: [], currentQuestionIndex: 0, gameStarted: false, results: null })} />
            ) : (
              <Navigate to="/" />
            )
          } />
        </Routes>
      </Router>
    );
  }
}
