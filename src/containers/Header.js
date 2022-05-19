import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import NavUser from "./NavUser";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          Task Project
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/create" className="nav-link">
              Create
            </Link>
          </Nav>
          <Nav>
            <NavUser />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {};

Header.defaultProps = {};
