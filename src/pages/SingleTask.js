import React from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

import Tweet from "../components/Task";
import useTweet from "../hooks/useTweet";
import Comment from "../components/Comment";

export default function SingleTask() {
  const params = useParams();
  const {
    data,
    error,
    loading,
    actions: { like, comment },
  } = useTweet({
    id: params.id,
  });

  function onLike(event) {
    event.stopPropagation();

    like({ id: data.id });
  }

  function onComment(event) {
    event.preventDefault();

    const { content } = event.target.elements;

    comment({
      content: content.value,
      tweetId: data.id,
    });

    content.value = "";
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
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Tweet
        user={data.user}
        date={data.date}
        content={data.content}
        commentsCount={data.commentsCount}
        likes={data.likes}
        onLike={onLike}
      />
      <Form onSubmit={onComment}>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name="content" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Comment
        </Button>
      </Form>
      {data.comments.map(function (item) {
        return (
          <Comment
            key={item._id}
            user={item.user}
            content={item.content}
            date={item.date}
          />
        );
      })}
    </>
  );
}
