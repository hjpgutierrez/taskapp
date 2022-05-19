import http from "./http";

import { setSession } from "../auth";

export async function signIn({ email, password }) {
  return http
    .post(`/users/signin`, { email, password })
    .then(({ data: json }) => {
      setSession(json.meta.id);

      return json;
    });
}

export async function signUp(body) {
  return http.post(`/users/signup`, body).then(({ data: json }) => {
    return json;
  });
}
