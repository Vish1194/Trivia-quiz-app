import { useState } from "react";
import { decode } from "html-entities";


const QuesAns = ({ index, question, answers, onAnswerSelected }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Initialize selected answer
  

    const handleRadioChange = (event) => {
      setSelectedAnswer(event.target.value);
      if (onAnswerSelected) { // Check if onAnswerSelected function is provided
        onAnswerSelected(index, event.target.value); // Call parent's function with index and answer
      }
    };
  
    return (
      <div>
        <h3>{index + '. ' + decode(question)}</h3>
        {answers.map((answer, answerIndex) => (
          <div key={answerIndex} className="form-check my-2">
            <input
              className="form-check-input"
              type="radio"
              name={`options-${index}`}
              value={answer}
              checked={selectedAnswer === answer} // Set checked state based on selectedAnswer
              onChange={handleRadioChange}
              id={`inlineRadio${answerIndex}`}
            />
            <label className="form-check-label" htmlFor={`inlineRadio${answerIndex}`}>
              {decode(answer)}
            </label>
          </div>
        ))}
      </div>
    );
  };
  
  export default QuesAns;