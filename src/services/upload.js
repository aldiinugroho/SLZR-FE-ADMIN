import * as api from "./api";

const ROUTE = "upload"

export async function postUpload(path = "", data) {
  const formData = new FormData()
  formData.append("file",data)
  return await api.POST({
    route: ROUTE,
    path: path,
    body: formData,
    withBodyStringify: false,
    withBaseHeader: false
  })
}