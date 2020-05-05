import React from 'react';
import '../../../App.css'

function AnsweredQuestion(props) {

  return (
    <div className="answered">
      <div>
        <p className="question-text">{props.text}</p>
        <p className="question-asker">{props.name}</p>
      </div>
      <hr />
      <p className="answer">{props.answer}</p>
    </div>
  );
}

export default AnsweredQuestion;
