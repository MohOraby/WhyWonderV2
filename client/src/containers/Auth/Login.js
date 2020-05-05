import React, { Component } from 'react';
import axios from 'axios'
import '../../App.css'
import { Link } from 'react-router-dom';

class Login extends Component {
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
      email: this.state.email,
      password: this.state.password
    };
    axios.post("http://localhost:3001/api/v1/user/login", userData)
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
          <div className="col-sm-12">
            <div className="login-form login">
              <h1 className="text-center">Login</h1>
              <input onChange={this.changeValue} type="email" name="email" placeholder="Email" className="form-control" />
              <input onChange={this.changeValue} type="password" name="password" placeholder="password" className="form-control" />
              <button onClick={this.postUser} className="btn btn-success form-control">Submit</button>
              <h6 className="text-center">Don't have an account? <Link to="/register">Register</Link></h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
