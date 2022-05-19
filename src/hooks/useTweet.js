import useSWR from "swr";
import { createComment } from "../api/comments";

import { getTweet, updateTweet } from "../api/tasks";

export default function useTweet({ id }) {
  const { data, error, mutate } = useSWR(`/tweets/${id}`, () =>
    getTweet({ id })
  );

  function like() {
    const payload = {
      id,
      likes: data.likes + 1,
    };

    mutate(
      {
        ...data,
        likes: payload.likes,
      },
      false
    );

    updateTweet(payload);
  }

  async function comment(payload) {
    await createComment(payload);
    mutate();
  }

  return {
    data: data ?? {},
    error,
    loading: !error && !data,
    actions: {
      like,
      comment,
    },
  };
}
