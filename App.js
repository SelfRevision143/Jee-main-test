import React, { useState, useEffect } from "react";

const quizData = [
  {
    question: "Q1: Example question?",
    options: ["A", "B", "C", "D"],
    answer: "D"
  },
  {
    question: "Q2: Another example?",
    options: ["A", "B", "C", "D"],
    answer: "B"
  }
];

function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(7200);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [started, timeLeft, submitted]);

  const handleOptionChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    quizData.forEach((q, i) => {
      if (answers[i] === q.answer) score += 4;
      else if (answers[i]) score -= 1;
    });
    return score;
  };

  if (!started) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Enter your name to start</h2>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button onClick={() => name && setStarted(true)}>Start Test</button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Test Submitted</h2>
        <p>Name: {name}</p>
        <p>Score: {getScore()}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</h2>
      {quizData.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map((opt, j) => (
            <label key={j} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name={`q${i}`}
                value={opt}
                checked={answers[i] === opt}
                onChange={() => handleOptionChange(i, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;