import React from 'react';
import '../../../App.css'

function UnansweredQuestion(props) {

  return (
    <div className="unanswered">
      <div>
        <p className="question-text">{props.text}</p>
        <p className="question-asker">{props.name}</p>
      </div>
    </div>
  );
}

export default UnansweredQuestion;
