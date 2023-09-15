import * as api from "./api";

const ROUTE = "auth"

export async function postAuth({
  path = "",
  body = ""
}) {
  return await api.POST({
    body: body,
    route: ROUTE,
    path: path
  })
}
