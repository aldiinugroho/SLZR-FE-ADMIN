import * as api from "./api";

const ROUTE = "carbrand"

export async function getCarBrand(path = "") {
  return await api.GET({
    route: ROUTE,
    path: path
  })
}
