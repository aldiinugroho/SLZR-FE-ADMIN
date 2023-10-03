import { storeStokDetail } from "../pages/stok/childs/detail/store";
import { ModelResponseStok, ModelResponseStokCarBookKeeping, ModelResponseStokCarBookKeepingCarBuyFrom, ModelResponseStokCarBookKeepingCarLeasing, ModelResponseStokCarBookKeepingPaymentTools, ModelResponseStokCarBookKeepingTransactionPayment, ModelResponseStokCarBrand, ModelResponseStokCarImage, ModelResponseStokCarOtherPrice, ModelResponseStokCarShowroom } from "../pages/stok/childs/liststok/state";
import { storeListStok } from "../pages/stok/childs/liststok/store";
import { storeMarkSold } from "../pages/stok/childs/liststok/storev1marksold";
import { storeCreateCarBookKeeping } from "../pages/stok/childs/proses/store";
import { storeDetailBookKeepingWebsite } from "../pages/stok/childs/proses/storedetailbookkeepingwebsite";
import { storeUpdateFromWeb } from "../pages/stok/childs/proses/storeupdatefromweb";
import { getCarBookKeeping, patchCarBookKeeping, postCarBookKeeping } from "../services/carbookkeeping";

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
        carLeasing: x?.msCarLeasing === null ? null : new ModelResponseStokCarBookKeepingCarLeasing(x?.msCarLeasing),
        transactionPayment: x?.msTransactionPayment === null ? null : new ModelResponseStokCarBookKeepingTransactionPayment(x?.msTransactionPayment)
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
        carLeasing: x?.msCarLeasing === null ? null : new ModelResponseStokCarBookKeepingCarLeasing(x?.msCarLeasing),
        transactionPayment: x?.msTransactionPayment === null ? null : new ModelResponseStokCarBookKeepingTransactionPayment(x?.msTransactionPayment)
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
  type = "",
  tabselector = ""
}) {
  try {
    storeListStok.getState().setOnlyLoading()
    const reqData = {
      carId: carId,
      carBookKeepingId: carBookKeepingId
    }
    const result = await patchCarBookKeeping("/cancel",reqData)
    if (result.message !== "ok") throw result
    if (type === "Booked") {
      await getListBookedByCarBuyFrom(tabselector)
    } else {
      await getList(type)
    }
  } catch (e) {
    storeListStok.getState().resetOnlyLoading()
    if (typeof e === "string") {
      throw e
    } else {
      throw e?.rawmessage
    }
  }
}

export async function getDetailByCarId(carId = "") {
  try {
    storeStokDetail.getState().setloading()
    const result = await getCarBookKeeping(`/car/${carId}`)
    if (result.message !== "ok") throw result
    console.log(result);
    const i = result.data?.data
    const parsedData = new ModelResponseStok({
      ...i,
      carImage: i?.msCarImages.map((x) => new ModelResponseStokCarImage(x)),
      carBrand: new ModelResponseStokCarBrand(i?.msCarBrand),
      showroom: new ModelResponseStokCarShowroom(i?.msShowroom),
      carOtherPrice: i?.msCarOtherPrices.map((x) => new ModelResponseStokCarOtherPrice(x)),
      carBookKeeping: i?.msCarBookKeepings.map((x) => new ModelResponseStokCarBookKeeping({
        ...x,
        carBookKeepingCarBuyFrom: new ModelResponseStokCarBookKeepingCarBuyFrom(x?.msCarBuyFrom),
        carBookKeepingPaymentTools: x?.msCarBookKeepingPaymentTool === null ? null : new ModelResponseStokCarBookKeepingPaymentTools(x?.msCarBookKeepingPaymentTool),
        carLeasing: x?.msCarLeasing === null ? null : new ModelResponseStokCarBookKeepingCarLeasing(x?.msCarLeasing),
        transactionPayment: x?.msTransactionPayment === null ? null : new ModelResponseStokCarBookKeepingTransactionPayment(x?.msTransactionPayment)
      }))
    })
    console.log(parsedData);
    storeStokDetail.getState().setdata(parsedData)
  } catch (e) {
    storeStokDetail.getState().reset()
    throw e?.rawmessage
  }
}

export async function createCarBookKeeping({
  carId = "",
  carBuyFromId = "",
  carBookKeepingPaymentToolsId = "",
  carBookKeepingName = "",
  carBookKeepingPhone = "",
  carBookKeepingKTP = "",
  carBookKeepingSoldPrice = 0,
  carBookKeepingBookedFee = 0,
  carLeasing = ""
}) {
  try {
    storeCreateCarBookKeeping.getState().setloading()
    const reqData = {
      "carId": carId,
      "carBuyFromId": carBuyFromId,
      "carBookKeepingPaymentToolsId": carBookKeepingPaymentToolsId,
      "carBookKeepingName": carBookKeepingName,
      "carBookKeepingPhone": carBookKeepingPhone,
      "carBookKeepingKTP": carBookKeepingKTP,
      "carBookKeepingSoldPrice": parseInt(carBookKeepingSoldPrice.replace(/\./g,"")),
      "carBookKeepingBookedFee": parseInt(carBookKeepingBookedFee === "" ? 0 : carBookKeepingBookedFee.replace(/\./g,"")),
      "carLeasing": carLeasing
    }
    const result = await postCarBookKeeping("/create",reqData)
    if (result.message !== "ok") throw result
    storeCreateCarBookKeeping.getState().setdata()
  } catch (e) {
    storeCreateCarBookKeeping.getState().reset()
    throw e?.rawmessage
  }
}

export async function getDetailFromWebsiteOnly(carBookKeepingId = "") {
  try {
    storeDetailBookKeepingWebsite.getState().setloading()
    const result = await getCarBookKeeping(`/${carBookKeepingId}`)
    if (result.message !== "ok") throw result
    const x = result.data?.data
    const responseData = new ModelResponseStokCarBookKeeping({
      ...x,
      carBookKeepingCarBuyFrom: new ModelResponseStokCarBookKeepingCarBuyFrom(x?.msCarBuyFrom),
      carBookKeepingPaymentTools: x?.msCarBookKeepingPaymentTool === null ? null : new ModelResponseStokCarBookKeepingPaymentTools(x?.msCarBookKeepingPaymentTool),
      carLeasing: x?.msCarLeasing === null ? null : new ModelResponseStokCarBookKeepingCarLeasing(x?.msCarLeasing),
      transactionPayment: x?.msTransactionPayment === null ? null : new ModelResponseStokCarBookKeepingTransactionPayment(x?.msTransactionPayment)
    })
    console.log(responseData);
    storeDetailBookKeepingWebsite.getState().setdata(responseData)
  } catch (e) {
    storeDetailBookKeepingWebsite.getState().reset()
    throw e?.rawmessage
  }
}

export async function setMarkSold({
  carId = "",
  carBookKeepingId = ""
}) {
  try {
    storeMarkSold.getState().setloading()
    const reqData = {
      carId,
      carBookKeepingId
    }
    const result = await patchCarBookKeeping("/mark-sold",reqData)
    if (result.message !== "ok") throw result
    storeMarkSold.getState().setdata()
  } catch (e) {
    storeMarkSold.getState().reset()
    throw e?.rawmessage
  }
}

export async function updateForWeb({
  carId = "",
  carBookKeepingId = "",
  carBookKeepingPaymentToolsId = "",
  carBookKeepingName = "",
  carBookKeepingPhone = "",
  carBookKeepingKTP = "",
  carBookKeepingSoldPrice = "",
  carLeasing = ""
}) {
  try {
    storeUpdateFromWeb.getState().setloading()
    const reqData = {
      carId,
      carBookKeepingId,
      carBookKeepingPaymentToolsId,
      carBookKeepingName,
      carBookKeepingPhone,
      carBookKeepingKTP,
      carBookKeepingSoldPrice: parseInt(carBookKeepingSoldPrice),
      carLeasing: carLeasing === "none" ? "" : carLeasing
    }
    const result = await patchCarBookKeeping("/update-web",reqData)
    if (result.message !== "ok") throw result
    storeUpdateFromWeb.getState().setdata()
  } catch (e) {
    storeUpdateFromWeb.getState().reset()
    throw e?.rawmessage
  }
}