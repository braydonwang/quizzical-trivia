import Option from "./Option";
import he from "he";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [options, setOptions] = useState(choices(props.question));

  useEffect(() => {
    const correct = options.some((option) => option.isHeld && option.isCorrect);
    const attempt = options.some((option) => option.isHeld);
    props.handleChange(props.question.id, correct, attempt);
  }, [options]);

  const optionElements = options.map((option) => {
    return (
      <Option
        key={option.id}
        value={option.value}
        isHeld={option.isHeld}
        isCorrect={option.isCorrect}
        isDone={props.isDone}
        handleClick={() => handleClick(option.id)}
      />
    );
  });

  function handleClick(id) {
    if (!props.isDone) {
      setOptions((prevOptions) => {
        return prevOptions.map((option) => {
          return option.id === id
            ? {
                ...option,
                isHeld: true,
              }
            : {
                ...option,
                isHeld: false,
              };
        });
      });
    }
  }

  function choices(question) {
    const rand = Math.floor(Math.random() * 4);
    const choiceElements = [];
    var index = 0;
    for (let i = 0; i < 4; i++) {
      if (i === rand) {
        choiceElements.push({
          id: nanoid(),
          value: question.correct_answer,
          isHeld: false,
          isCorrect: true,
        });
      } else {
        choiceElements.push({
          id: nanoid(),
          value: question.incorrect_answers[index],
          isHeld: false,
          isCorrect: false,
        });
        index++;
      }
    }
    return choiceElements;
  }

  return (
    <div className="quiz-container">
      <h2 className="quiz-question">{he.decode(props.question.question)}</h2>
      {optionElements}
      <br /> <br />
      <hr />
    </div>
  );
}
