import { formatDistance } from "date-fns";

import http from "./http";

function transformTweet(item) {
  return {
    commentsCount: Array.isArray(item.comments) ? item.comments.length : 0,
    id: item._id,
    content: item.content,
    date: formatDistance(new Date(item.createdAt), new Date()),
    user: {
      name: item.userId ? item.userId.name : "Unknown",
      username: item.userId ? item.userId.username : "Unknown",
    },
    comments: Array.isArray(item.comments)
      ? item.comments.map((comment) => {
          return {
            content: comment.content,
            user: {
              name: comment.userId ? comment.userId.name : "Unknown",
              username: comment.userId ? comment.userId.username : "Unknown",
            },
            date: formatDistance(new Date(comment.createdAt), new Date()),
          };
        })
      : [],
    likes: item.likes,
  };
}

function transformTask(item) {
  return {
    commentsCount: 0,
    id: item._id,
    content: item.description,
    date: formatDistance(new Date(item.createdAt), new Date()),
    user: {
      name: "Unknown",
      username: "Unknown",
    },
    comments: [],
    likes: 0,
    textCompleted: item.completed ? "Completed" : "Not Completed",
    completed: item.completed,
  };
}

export function getTasks(userId) {
  return http.get(`/tasks/tasks/${userId}`).then(({ data: json }) => {
    const transformData = json.data.map(function (item) {
      return transformTask(item);
    });

    return {
      data: transformData,
      meta: {},
    };
  });
}

export function getTask({ id }) {
  return http
    .get(`/tasks/${id}`)
    .then(({ data: json }) => transformTask(json.data));
}

export function createTask(payload) {
  return http
    .post(`/tasks`, payload)
    .then(({ data: json }) => transformTask(json.data));
}

export function updateTask(payload) {
  const { id } = payload;
  return http
    .patch(`/tasks/${id}`, payload)
    .then(({ data: json }) => transformTask(json.data));
}

export function deleteTask(taskId) {
  return http
    .delete(`/tasks/${taskId}`)
    .then(({ data: json }) => transformTask(json.data));
}
