import { useState } from "react";
import FrontPage from "./components/FrontPage";
import Quiz from "./components/Quiz";
import Background from "./components/Background";

export default function App() {
  const [isQuiz, setIsQuiz] = useState(false);

  function startQuiz() {
    setIsQuiz(true);
  }

  return (
    <div>
      <Background />
      {isQuiz ? <Quiz /> : <FrontPage startQuiz={startQuiz} />}
    </div>
  );
}
