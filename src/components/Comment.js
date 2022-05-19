import React from "react";
import { Card } from "react-bootstrap";

export default function Comment({ user = {}, content = "", date = "" }) {
  return (
    <Card className="my-3 border">
      <Card.Body>
        <Card.Title>
          {user.name} - @{user.username}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text>
          <span
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
