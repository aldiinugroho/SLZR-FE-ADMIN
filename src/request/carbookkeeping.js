import { ModelResponseStok, ModelResponseStokCarBookKeeping, ModelResponseStokCarBookKeepingCarBuyFrom, ModelResponseStokCarBookKeepingCarLeasing, ModelResponseStokCarBookKeepingPaymentTools, ModelResponseStokCarBrand, ModelResponseStokCarImage, ModelResponseStokCarOtherPrice, ModelResponseStokCarShowroom } from "../pages/stok/childs/liststok/state";
import { storeListStok } from "../pages/stok/childs/liststok/store";
import { getCarBookKeeping, patchCarBookKeeping } from "../services/carbookkeeping";

export async function getList(type = "") {
  try {
    storeListStok.getState().setloading()
    const result = await getCarBookKeeping(`/car-status/${type}`)
    if (result.message !== "ok") throw result
    console.log(result);
    const parsedData = result.data?.data.map((i) => new ModelResponseStok({
      ...i,
      carImage: i?.msCarImages.map((x) => new ModelResponseStokCarImage(x)),
      carBrand: new ModelResponseStokCarBrand(i?.msCarBrand),
      showroom: new ModelResponseStokCarShowroom(i?.msShowroom),
      carOtherPrice: i?.msCarOtherPrices.map((x) => new ModelResponseStokCarOtherPrice(x)),
      carBookKeeping: i?.msCarBookKeepings.map((x) => new ModelResponseStokCarBookKeeping({
        ...x,
        carBookKeepingCarBuyFrom: new ModelResponseStokCarBookKeepingCarBuyFrom(x?.msCarBuyFrom),
        carBookKeepingPaymentTools: x?.msCarBookKeepingPaymentTool === null ? null : new ModelResponseStokCarBookKeepingPaymentTools(x?.msCarBookKeepingPaymentTool),
        carLeasing: x?.msCarLeasing === null ? null : new ModelResponseStokCarBookKeepingCarLeasing(x?.msCarLeasing)
      }))
    }))
    console.log(parsedData);
    storeListStok.getState().setdata(parsedData)
  } catch (e) {
    storeListStok.getState().reset()
    throw e?.rawmessage
  }
}

export async function getListBookedByCarBuyFrom(carBuyFromId = "") {
  try {
    storeListStok.getState().setloading()
    const result = await getCarBookKeeping(`/car-status/booked/on-progress/${carBuyFromId}`)
    if (result.message !== "ok") throw result
    console.log(result);
    const parsedData = result.data?.data.map((i) => new ModelResponseStok({
      ...i,
      carImage: i?.msCarImages.map((x) => new ModelResponseStokCarImage(x)),
      carBrand: new ModelResponseStokCarBrand(i?.msCarBrand),
      showroom: new ModelResponseStokCarShowroom(i?.msShowroom),
      carOtherPrice: i?.msCarOtherPrices.map((x) => new ModelResponseStokCarOtherPrice(x)),
      carBookKeeping: i?.msCarBookKeepings.map((x) => new ModelResponseStokCarBookKeeping({
        ...x,
        carBookKeepingCarBuyFrom: new ModelResponseStokCarBookKeepingCarBuyFrom(x?.msCarBuyFrom),
        carBookKeepingPaymentTools: x?.msCarBookKeepingPaymentTool === null ? null : new ModelResponseStokCarBookKeepingPaymentTools(x?.msCarBookKeepingPaymentTool),
        carLeasing: x?.msCarLeasing === null ? null : new ModelResponseStokCarBookKeepingCarLeasing(x?.msCarLeasing)
      }))
    }))
    console.log(parsedData);
    storeListStok.getState().setdata(parsedData)
  } catch (e) {
    storeListStok.getState().reset()
    throw e?.rawmessage
  }
}

export async function cancelBookedKeeping({
  carId = "",
  carBookKeepingId = "",
  type = ""
}) {
  try {
    storeListStok.getState().setOnlyLoading()
    const reqData = {
      carId: carId,
      carBookKeepingId: carBookKeepingId
    }
    const result = await patchCarBookKeeping("/cancel",reqData)
    if (result.message !== "ok") throw result
    await getListBookedByCarBuyFrom(type)
  } catch (e) {
    storeListStok.getState().resetOnlyLoading()
    if (typeof e === "string") {
      throw e
    } else {
      throw e?.rawmessage
    }
  }
}