import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";

import { createTask } from "../api/tasks";
import { getSession } from "../auth";

export default function Create() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const { description } = event.target.elements;

    try {
      setError("");
      await createTask({
        description: description.value,
        userId: getSession(),
      });

      navigate("/");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <>
      <h2 className="mt-2">Add Task</h2>
      {error && <Alert variant="warning">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
}
