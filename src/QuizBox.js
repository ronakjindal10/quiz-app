import React, { useState, useEffect } from "react";
import Question from "./Question";
import Option from "./Option";

const QuizBox = () => {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([[]]);
  const [questionNo, setQuestionNo] = useState(0);
  const [chosenOptionCorrect, setChosenOptionCorrect] = useState("");
  const [correctOption, setCorrectOption] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then((responses) => {
        const results = responses.results;
        setQuestions(results.map((result) => result.question));
        setOptions(
          results.map((result) => {
            const optionsArray = result.incorrect_answers;
            optionsArray.splice(
              Math.floor(Math.random() * (result.incorrect_answers.length + 2)),
              0,
              result.correct_answer
            );
            return optionsArray;
          })
        );
        setCorrectOption(results.map((result) => result.correct_answer));
      });
  }, []);

  useEffect(() => {
    setChosenOptionCorrect("");
  }, [questionNo]);

  const handleClick = (event) => {
    event.preventDefault();
    correctOption[questionNo] === event.target.value
      ? setChosenOptionCorrect(true)
      : setChosenOptionCorrect(false);
  };
  return (
    <div className="quiz-box">
      <div className="question">
        <Question question={questions[questionNo]} />
      </div>
      <div className="options">
        {options[questionNo].map((option, index) => (
          <Option option={option} id={index} handleClick={handleClick} />
        ))}
      </div>
      <div className="result-message">
        {chosenOptionCorrect === "" ? (
          <div></div>
        ) : chosenOptionCorrect === true ? (
          <h2 className="right-answer">You are absolutely right!</h2>
        ) : (
          <h2 className="wrong-answer">You suck!</h2>
        )}
      </div>
      <div>
        <button
          className="next-button"
          onClick={() => setQuestionNo(questionNo + 1)}
          disabled={questionNo == questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizBox;
