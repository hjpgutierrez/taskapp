import useSWR from "swr";
import { getTask, updateTask } from "../api/tasks";

export default function useTask({ id }) {
  const { data, error, mutate } = useSWR(`/tasks/${id}`, () => getTask({ id }));

  async function update(payload) {
    await updateTask(payload);
    mutate();
  }

  return {
    data: data ?? {},
    error,
    loading: !error && !data,
    actions: {
      update,
    },
  };
}
