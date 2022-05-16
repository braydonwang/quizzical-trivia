export default function FrontPage(props) {
  return (
    <div className="front-container">
      <h1 className="front-title">Quizzical</h1>
      <h3 className="front-description">A multiple choice trivia game</h3>
      <button className="front-button" onClick={props.startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
