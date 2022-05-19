import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";

import { signUp } from "../api/users";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const { email, password, firstname, lastname } = event.target.elements;

    try {
      setError("");
      const { data: user } = await signUp({
        email: email.value,
        password: password.value,
        firstname: firstname.value,
        lastname: lastname.value,
      });

      navigate("/signin");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <>
      <h2 className="mt-2">Sign Up</h2>
      {error && <Alert variant="warning">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder="Enter your lastname"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
}
