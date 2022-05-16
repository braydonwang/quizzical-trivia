import { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isDone) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) =>
          setQuestions(
            data.results.map((item) => {
              return {
                ...item,
                id: nanoid(),
                isCorrect: false,
                isAttempted: false,
              };
            })
          )
        );
    }
  }, [isDone]);

  const questionElements = questions.map((question) => {
    return (
      <Question
        key={question.id}
        question={question}
        isDone={isDone}
        handleChange={handleChange}
      />
    );
  });

  function handleCheck() {
    setIsDone((prevDone) => {
      if (prevDone) {
        return !prevDone;
      } else if (questions.every((question) => question.isAttempted)) {
        return !prevDone;
      }
      return prevDone;
    });
  }

  function handleChange(id, correct, attempt) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        return question.id === id
          ? {
              ...question,
              isCorrect: correct,
              isAttempted: attempt,
            }
          : question;
      });
    });
  }

  return (
    <div className="main-container">
      {isDone && <Confetti />}
      {questionElements}
      <div className="quiz-footer">
        {isDone && (
          <p className="quiz-stats">
            You scored{" "}
            {questions.filter((question) => question.isCorrect).length}/5
            correct answers!
          </p>
        )}
        <button className="check-button" onClick={handleCheck}>
          {isDone ? "Play again" : "Check answers"}
        </button>
      </div>
    </div>
  );
}
