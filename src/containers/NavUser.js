import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { clearSession } from "../auth";
import UserContext from "./UserContext";

export default function NavUser() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function onSignOut(event) {
    event.preventDefault();
    setUser(null);
    clearSession();

    navigate("/");
  }

  return user ? (
    <>
      <Link to="/profile" className="nav-link">
        {user.email}
      </Link>
      <Nav.Link onClick={onSignOut}>Sign Out</Nav.Link>
    </>
  ) : (
    <>
      <Link to="/signup" className="nav-link">
        Sign Up
      </Link>
      <Link to="/signin" className="nav-link">
        Sign In
      </Link>
    </>
  );
}
