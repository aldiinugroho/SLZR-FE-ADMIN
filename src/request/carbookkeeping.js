import { getCarBookKeeping } from "../services/carbookkeeping";

export async function getList(type = "") {
  try {
    // storeListCar.getState().setloading()
    const result = await getCarBookKeeping(`/car-status/${type}`)
    console.log(result);
    // if (result.message !== "ok") throw result
    // const parsedData = result.data?.data.map((i) => new ModelCar(i))
    // storeListCar.getState().setdata(parsedData)
  } catch (e) {
    throw e?.rawmessage
  }
}