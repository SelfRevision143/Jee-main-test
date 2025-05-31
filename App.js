
// JEE Mock Test React App - App.js
// See previous response for full detailed logic
import React, { useState, useEffect } from 'react';

const questions = [
  {
    id: 1,
    subject: 'Physics',
    type: 'mcq',
    question: 'Which of the following quantities has the same units as impulse?',
    options: ['Energy', 'Momentum', 'Power', 'Velocity'],
    correctAnswer: 'C',
  },
  {
    id: 2,
    subject: 'Chemistry',
    type: 'mcq',
    question: 'Which element is most electronegative?',
    options: ['Fluorine', 'Chlorine', 'Oxygen', 'Nitrogen'],
    correctAnswer: 'A',
  },
  {
    id: 3,
    subject: 'Maths',
    type: 'mcq',
    question: 'What is the derivative of sin(x)?',
    options: ['cos(x)', '-cos(x)', '-sin(x)', 'sec(x)tan(x)'],
    correctAnswer: 'A',
  },
  {
    id: 4,
    subject: 'Physics',
    type: 'mcq',
    question: 'Which law explains the relationship between voltage and current?',
    options: ['Ohm’s Law', 'Newton’s Law', 'Faraday’s Law', 'Ampere’s Law'],
    correctAnswer: 'A',
  },
  {
    id: 5,
    subject: 'Chemistry',
    type: 'mcq',
    question: 'pH of a neutral solution at 25°C is?',
    options: ['6', '8', '7', '5'],
    correctAnswer: 'C',
  },
  {
    id: 6,
    subject: 'Maths',
    type: 'mcq',
    question: 'What is the integral of x^2 dx?',
    options: ['x^2/2 + C', 'x^3/3 + C', '2x + C', 'x^3 + C'],
    correctAnswer: 'B',
  },
  {
    id: 7,
    subject: 'Physics',
    type: 'mcq',
    question: 'What does the area under a velocity-time graph represent?',
    options: ['Acceleration', 'Displacement', 'Speed', 'Force'],
    correctAnswer: 'B',
  },
  {
    id: 8,
    subject: 'Chemistry',
    type: 'mcq',
    question: 'Which of these is a noble gas?',
    options: ['Neon', 'Nitrogen', 'Oxygen', 'Hydrogen'],
    correctAnswer: 'A',
  },
  {
    id: 9,
    subject: 'Maths',
    type: 'mcq',
    question: 'What is the value of cos(0°)?',
    options: ['0', '1', '-1', '0.5'],
    correctAnswer: 'B',
  },
  {
    id: 10,
    subject: 'Physics',
    type: 'mcq',
    question: 'What type of lens converges light rays?',
    options: ['Concave', 'Convex', 'Plane', 'None'],
    correctAnswer: 'B',
  },
];

const TOTAL_TIME = 120 * 60;

export default function App() {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (started && !submitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, submitted]);

  const handleOptionChange = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const formatTime = (t) => {
    const m = String(Math.floor(t / 60)).padStart(2, '0');
    const s = String(t % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const score = Object.entries(answers).reduce((acc, [qid, ans]) => {
    const question = questions.find(q => q.id === parseInt(qid));
    if (question && ans === question.correctAnswer) return acc + 4;
    else return acc - 1;
  }, 0);

  const groupedQuestions = [];
  for (let i = 0; i < questions.length; i += 4) {
    groupedQuestions.push(questions.slice(i, i + 4));
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {!started ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">JEE Mock Test</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => name && setStarted(true)}
            disabled={!name}
          >
            Start Test
          </button>
        </div>
      ) : submitted ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Test Submitted</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Score:</strong> {score}</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Time Left: {formatTime(timeLeft)}</h2>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Submit Test
            </button>
          </div>
          {groupedQuestions.map((group, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-4 mb-6">
              {group.map((q) => (
                <div key={q.id} className="border p-4 rounded shadow">
                  <p className="font-medium mb-2">Q{q.id}. {q.question}</p>
                  {q.options.map((opt, i) => (
                    <label key={i} className="block">
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={String.fromCharCode(65 + i)}
                        checked={answers[q.id] === String.fromCharCode(65 + i)}
                        onChange={() => handleOptionChange(q.id, String.fromCharCode(65 + i))}
                        className="mr-2"
                      />
                      {String.fromCharCode(65 + i)}) {opt}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
