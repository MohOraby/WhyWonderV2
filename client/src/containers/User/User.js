import React, { Component } from 'react';
import axios from 'axios';

import AnsweredQuestion from '../../components/Questions/AnsweredQuestion/AnsweredQuestion';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      questions: [],
      questionText: ""
    };

    this.changeQuestionText = this.changeQuestionText.bind(this)
    this.postQuestion = this.postQuestion.bind(this)
  }


  getUserPage() {
    axios.get(`http://localhost:3001/api/v1/question/${this.props.match.params.id}`, {
      headers: {
        Authorization: localStorage.getItem('jwt')
      }
    })
      .then(res => this.setState({ user: res.data.user, questions: res.data.questions }));
  };

  postQuestion() {
    const token = localStorage.getItem('jwt')
    const questionData = {
      text: this.state.questionText
    };
    if (!this.state.questionText.length) {
      return alert('Please enter question')
    }
    axios.post(`http://localhost:3001/api/v1/question/${this.props.match.params.id}`, questionData, {
      headers: {
        Authorization: token
      }
    })
    this.setState({ questionText: "" })
  }

  removeQuestion(id) {
    const filteredArray = this.state.questions.filter(question => question._id !== id)
    this.setState({ questions: filteredArray });
  };

  deleteQuestion(id) {
    const token = localStorage.getItem('jwt');
    axios.post(`http://localhost:3001/api/v1/question/5eaf267405e7b02c04f2ecf6/${id}/delete`, {}, {
      headers: {
        Authorization: token
      }
    })
    this.removeQuestion(id);
  }

  changeQuestionText(event) {
    this.setState({ questionText: event.target.value })
  }

  componentDidMount() {
    this.getUserPage();
  };

  componentWillUpdate() {
    this.getUserPage();
  };

  render() {
    const questions = this.state.questions.map(question => {
      return (
        <div key={question._id}>
          <AnsweredQuestion text={question.text} name={question.asker.name} answer={question.answer} />
          <button className="btn btn-danger delete-btn" onClick={() => this.deleteQuestion(question._id)}>Delete</button>
        </div>
      );
    });

    return (
      <div className="user container">
        <h1 className="username">{this.state.user.name}</h1>
        <textarea className="ask-form" value={this.state.questionText} onChange={this.changeQuestionText} />
        <br />
        <button className="btn btn-success" onClick={this.postQuestion}>Ask</button>
        <div className="questions-container">
          {questions}
        </div>
      </div>
    )
  }
}


export default User