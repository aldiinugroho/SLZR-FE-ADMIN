import { ModelResponseStok, ModelResponseStokCarBookKeeping, ModelResponseStokCarBookKeepingCarBuyFrom, ModelResponseStokCarBookKeepingCarLeasing, ModelResponseStokCarBookKeepingPaymentTools, ModelResponseStokCarBrand, ModelResponseStokCarImage, ModelResponseStokCarOtherPrice, ModelResponseStokCarShowroom } from "../pages/stok/childs/liststok/state";
import { getCarBookKeeping } from "../services/carbookkeeping";

export async function getList(type = "") {
  try {
    // storeListCar.getState().setloading()
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
        carBookKeepingPaymentTools: new ModelResponseStokCarBookKeepingPaymentTools(x?.msCarBookKeepingPaymentTool),
        carLeasing: new ModelResponseStokCarBookKeepingCarLeasing(x?.msCarLeasing)
      }))
    }))
    console.log(parsedData);
    // storeListCar.getState().setdata(parsedData)
  } catch (e) {
    throw e?.rawmessage
  }
}