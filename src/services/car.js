import * as api from "./api";

const ROUTE = "car"

export async function getCar(path = "") {
  return await api.GET({
    route: ROUTE,
    path: path
  })
}

export async function postCar(path = "",body = {}) {
  return await api.POST({
    route: ROUTE,
    path: path,
    body: body
  })
}

export async function patchCar(path = "",body = {}) {
  return await api.PATCH({
    route: ROUTE,
    path: path,
    body: body
  })
}

export async function deleteCar(path = "") {
  return await api.DELETE({
    route: ROUTE,
    path: path
  })
}
