import React, { Component } from 'react';
import axios from 'axios'
import '../../App.css'

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.changeValue = this.changeValue.bind(this)
    this.postUser = this.postUser.bind(this)
  }

  postUser() {
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    axios.post("http://localhost:3001/api/v1/user/register", userData)
      .then(res => {
        localStorage.setItem('jwt', res.data.token)
        localStorage.setItem('userId', res.data.user._id)
      });
    window.location.reload()
  }

  changeValue(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div class="col-sm-12 login-form register">
            <h1 className="text-center">Sign Up</h1>
            <input onChange={this.changeValue} type="email" name="email" placeholder="Email" className="form-control" />
            <input onChange={this.changeValue} type="text" name="name" placeholder="Name" className="form-control" />
            <input onChange={this.changeValue} type="password" name="password" placeholder="password" className="form-control" />
            <button onClick={this.postUser} className="btn btn-success form-control">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
