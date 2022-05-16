import he from "he";

export default function Option(props) {
  var className = "quiz-button";
  if (props.isCorrect && props.isDone) {
    className = "quiz-correct";
  } else if (props.isDone && props.isHeld) {
    className = "quiz-wrong";
  } else if (props.isHeld) {
    className = "quiz-held";
  }

  return (
    <button className={className} onClick={props.handleClick}>
      {he.decode(props.value)}
    </button>
  );
}
