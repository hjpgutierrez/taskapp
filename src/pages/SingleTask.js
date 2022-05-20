import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

import { deleteTask, updateTask, getTask } from "../api/tasks";

export default function SingleTask() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  //
  const handleChange = (event) => {
    if (event.target.checked) {
      console.log("✅ Checkbox is checked");
    } else {
      console.log("⛔️ Checkbox is NOT checked");
    }
    setIsCompleted(event.target.checked);
  };

  async function loadDetail(taskId) {
    setLoading(true);
    try {
      const response = await getTask(taskId);
      setIsCompleted(response.completed);
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDetail(id);

    if (id !== undefined) {
      loadDetail({ id });
    }
  }, [id]);

  async function onDelete(event) {
    event.stopPropagation();
    event.preventDefault();

    await deleteTask(id);
    navigate("/");
  }

  async function onUpdate(event) {
    event.stopPropagation();
    event.preventDefault();

    const { description } = event.target.elements;

    try {
      await updateTask({
        description: description.value,
        completed: isCompleted,
        id: id,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status" style={{ margin: "16px auto" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {data && (
        <Form onSubmit={onUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              defaultValue={data.content}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Completed"
              defaultChecked={isCompleted}
              onChange={handleChange}
              id="completed"
              name="completed"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>

          <Button
            variant="danger"
            type="submit"
            className="m-3"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Form>
      )}
    </>
  );
}
