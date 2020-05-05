import React from 'react';
import '../../App.css';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

function Navigation() {
  const userId = localStorage.getItem('userId');

  function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    window.location.reload();
  }

  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Navbar.Brand href="#home">WhyWonder</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-link" to="/questions">Questions</NavLink>
          <NavLink className="nav-link" to={`/user/${userId}`}>Profile</NavLink>
          <NavLink className="nav-link" to={`/userlist`}>Users</NavLink>
        </Nav>
        <Nav right-aligned>
        <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;

