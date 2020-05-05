import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      users: []
    };

  }


  getUserList() {
    axios.get(`http://localhost:3001/api/v1/user/list`, {
      headers: {
        Authorization: localStorage.getItem('jwt')
      }
    })
      .then(res => this.setState({ user: res.data.user, users: res.data.users }));
  };

  componentDidMount() {
    this.getUserList();
  };

  render() {
    const users = this.state.users.map(user => {
      return (
        <li className="list-group-item" key={user._id}>
          <Link to={`/user/${user._id}`}>{user.name}</Link>
        </li>
      );
    });

    return (
      <div className="container">
        <ul className="list-group users-list">
          {users}
        </ul>
      </div>
    )
  }
}


export default UserList