import * as api from "./api";

const ROUTE = "carbookkeeping"

export async function getCarBookKeeping(path = "") {
  return await api.GET({
    route: ROUTE,
    path: path
  })
}
