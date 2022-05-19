import http from './http';

export async function createComment({ content, tweetId }) {
  return http.post(`/comments`, { content, tweetId }).then(({ data: json }) => {
    return json.data;
  });
}
