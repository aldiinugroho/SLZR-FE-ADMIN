import * as api from "./api";

const ROUTE = "carbookkeeping"

export async function getCarBookKeeping(path = "") {
  return await api.GET({
    route: ROUTE,
    path: path
  })
}

export async function patchCarBookKeeping(path = "",body = {}) {
  return await api.PATCH({
    route: ROUTE,
    path: path,
    body: body
  })
}

export async function postCarBookKeeping(path = "",body = {}) {
  return await api.POST({
    route: ROUTE,
    path: path,
    body: body
  })
}