import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import Task from "../components/Task";
import useTasks from "../hooks/useTasks";
import { Alert } from "react-bootstrap";
import { getSession } from "../auth";
import { getTasks } from "../api/tasks";

export default function List() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadList() {
    setLoading(true);
    try {
      const response = await getTasks(getSession());
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(function () {
    loadList();
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status" style={{ margin: "16px auto" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {data.map(function (item) {
        return (
          <div
            onClick={function (event) {
              navigate(`/task/${item.id}`);
            }}
            key={item.id}
          >
            <Task
              date={item.date}
              content={item.content}
              textCompleted={item.textCompleted}
            />
          </div>
        );
      })}
    </>
  );
}
