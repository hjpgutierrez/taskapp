import React from "react";
import Card from "react-bootstrap/Card";

export default function Task({ date = "", content = "", textCompleted = "" }) {
  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{content}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text>{textCompleted}</Card.Text>
      </Card.Body>
    </Card>
  );
}
