import React, { Component } from 'react';
import axios from 'axios';

import UnansweredQuestion from '../../components/Questions/UnansweredQuestion/UnansweredQuestion';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      questions: [],
      answer: ""
    };
    this.postAnswer = this.postAnswer.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.changeQuestionAnswer = this.changeQuestionAnswer.bind(this)
  };

  removeQuestion(id) {
    const filteredArray = this.state.questions.filter(question => question._id !== id)
    this.setState({ questions: filteredArray });
  };

  getQuestionsPage() {
    axios.get("http://localhost:3001/api/v1/question/list", {
      headers: {
        Authorization: localStorage.getItem('jwt')
      }
    })
      .then(res => this.setState({ user: res.data.user, questions: res.data.questions }));
  };

  postAnswer(id) {
    const token = localStorage.getItem('jwt');
    const questionData = {
      answer: this.state.answer
    };
    if (!this.state.answer.length) {
      return alert('Please enter question')
    }
    axios.post(`http://localhost:3001/api/v1/question/5eaf267405e7b02c04f2ecf6/${id}`, questionData, {
      headers: {
        Authorization: token
      }
    })
    this.removeQuestion(id);
  }

  deleteQuestion(id) {
    const token = localStorage.getItem('jwt');
    axios.post(`http://localhost:3001/api/v1/question/delete/${id}`, {}, {
      headers: {
        Authorization: token
      }
    })
    this.removeQuestion(id);
  }

  changeQuestionAnswer(event) {
    this.setState({ answer: event.target.value })
  }

  componentDidMount() {
    this.getQuestionsPage();
  };

  render() {
    const questions = this.state.questions.map(question => {
      return (
        <div key={question._id}>
          <UnansweredQuestion text={question.text} name={question.asker.name} />
          <input className="form-control" placeholder="Write your answer" onChange={this.changeQuestionAnswer} />
          <button className="btn btn-success" onClick={() => this.postAnswer(question._id)}>Answer</button>
          <button className="btn btn-danger delete-btn" onClick={() => this.deleteQuestion(question._id)}>Delete</button>
        </div >
      )
    });

    return (
      <div className="user container" >
        <h1 className="username">{this.state.user.name}</h1>
        <div className="questions-container">
          {questions}
        </div>
      </div>
    )
  }
}


export default Questions