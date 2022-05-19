import useSWR from "swr";

import { getTasks } from "../api/tasks";
const userId = "62845768ed346eb99bc05df5";
const fetcher = (url) => getTasks(userId).then((res) => res.data);

export default function useTasks(userId) {
  const { data, error } = useSWR(`tasks`, fetcher);

  return {
    data: data?.data || [],
    error,
    loading: !error && !data,
  };
}
