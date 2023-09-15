import {postAuth} from "../services/auth";

export async function login({
  email = "",
  password = ""
}) {
  try {
    const reqData = {
      email,
      password
    }
    const result = await postAuth({
      path: "/login",
      body: reqData
    })
    if (result.message !== "ok") throw result
    return true
  } catch (e) {
    throw e
  }
}
