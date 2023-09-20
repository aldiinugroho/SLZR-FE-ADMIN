import { postUpload } from "../services/upload"

export async function create(data) {
  try {
    const result = await postUpload("/create",data)
    if (result.message !== "ok") throw "Error uploading data."
    // sample: https://drive.google.com/uc?export=view&id=1dsCNxtsG2avVrUCtYkyaZs-lwf5G6xjK
    return result.data?.data
  } catch (e) {
    throw e?.rawmessage
  }
}
