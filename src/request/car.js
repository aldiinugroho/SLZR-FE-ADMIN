import { ModelCarDetail, storeCarDetail } from "../pages/register/childs/newcar/childs/newcarformsubmit/statedetailcar";
import { ModelCar, storeListCar } from "../pages/register/childs/newcar/state";
import { deleteCar, getCar, patchCar, postCar } from "../services/car";
// import { ModelShowroomForm, storeShowroomForm } from "../pages/register/childs/newshowroom/childs/newshowroomformsubmit/state";
// import { ModelShowroom, storeListShowroom } from "../pages/register/childs/newshowroom/state";
// import {deleteShowroom, getShowroom, patchShowroom, postShowroom} from "../services/showroom";

export async function getList() {
  try {
    storeListCar.getState().setloading()
    const result = await getCar("/list")
    if (result.message !== "ok") throw result
    const parsedData = result.data?.data.map((i) => new ModelCar(i))
    storeListCar.getState().setdata(parsedData)
  } catch (e) {
    storeListCar.getState().reset()
    throw e?.rawmessage
  }
}

export async function create(params = {}) {
  try {
    storeListCar.getState().setloading()
    const carBrand = params.carBrand
    const carFuel = params.carFuel
    const carShowroom = params.carShowroom
    const carTransmission = params.carTransmission
    const carYear = params.carYear
    const carImage = JSON.parse(params.carImage)
    const carOtherPrice = params.carOtherPrice === "" ? [] : JSON.parse(params.carOtherPrice)
    const reqData = {
      "showroomId": carShowroom,
      "carBrandId": carBrand,
      "carPlate": params.carPlate,
      "carName": params.carName,
      "carDescription": params.carDesc,
      "carTransmission": carTransmission,
      "carFuel": carFuel,
      "carTax": new Date(params.carTax),
      "carSTNK": params.carSTNK,
      "carBPKB": params.carBPKB,
      "carYear": carYear,
      "carSellPrice": parseInt(params.carSellPrice.replace(/\./g,"")),
      "carBuyPrice": parseInt(params.carBuyPrice.replace(/\./g,"")),
      "carImage": carImage.map((i) => {
        return {
          carImage: i.uri
        }
      }),
      "carOtherPrice": carOtherPrice.map((i) => {
        return {
          carOtherPriceName: i?.carOtherPriceName,
          carOtherPrice: parseInt(i?.carOtherPrice.replace(/\./g,"")),
        }
      })
    }
    console.log(reqData);
    const result = await postCar("/create",reqData)
    if (result.message !== "ok") throw result
    const parsedData = result.data?.data.map((i) => new ModelCar(i))
    storeListCar.getState().setdata(parsedData)
  } catch (e) {
    storeListCar.getState().reset()
    throw e?.rawmessage
  }
}

export async function reqDelete(carId = "") {
  try {
    storeListCar.getState().setloading()
    const result = await deleteCar(`/${carId}`)
    if (result.message !== "ok") throw result
    const parsedData = result.data?.data.map((i) => new ModelCar(i))
    storeListCar.getState().setdata(parsedData)
  } catch (e) {
    storeListCar.getState().reset()
    throw e?.rawmessage
  }
}

export async function detail(carId = "") {
  try {
    storeCarDetail.getState().setloading()
    const result = await getCar(`/${carId}`)
    if (result.message !== "ok") throw result
    const parsedData = new ModelCarDetail({
      ...result.data?.data,
      carShowroom: result.data?.data?.msShowroom,
      carBrand: result.data?.data?.msCarBrand,
      carImage: result.data?.data?.msCarImages,
      carOtherPrice: result.data?.data?.msCarOtherPrices
    })
    storeCarDetail.getState().setdata(parsedData)
  } catch (e) {
    storeCarDetail.getState().reset()
    throw e?.rawmessage
  }
}

export async function update(params = {}) {
  try {
    storeListCar.getState().setloading()
    const carImage = JSON.parse(params.carImage)
    const carOtherPrice = params.carOtherPrice === "" ? [] : JSON.parse(params.carOtherPrice)
    const reqData = {
      "carId": params.carId,
      "showroomId": params.carShowroom,
      "carBrandId": params.carBrand,
      "carPlate": params.carPlate,
      "carName": params.carName,
      "carDescription": params.carDesc,
      "carTransmission": params.carTransmission,
      "carFuel": params.carFuel,
      "carTax": new Date(params.carTax),
      "carSTNK": params.carSTNK,
      "carBPKB": params.carBPKB,
      "carYear": params.carYear,
      "carSellPrice": parseInt(params.carSellPrice.replace(/\./g,"")),
      "carBuyPrice": parseInt(params.carBuyPrice.replace(/\./g,"")),
      "carImage": carImage.map((i) => {
        return {
          carImage: i.uri
        }
      }),
      "carOtherPrice": carOtherPrice.map((i) => {
        return {
          carOtherPriceName: i?.carOtherPriceName,
          carOtherPrice: parseInt(i?.carOtherPrice.replace(/\./g,"")),
        }
      })
    }
    const result = await patchCar("/update",reqData)
    if (result.message !== "ok") throw result
    const parsedData = result.data?.data.map((i) => new ModelCar(i))
    storeListCar.getState().setdata(parsedData)
  } catch (e) {
    storeListCar.getState().reset()
    throw e?.rawmessage
  }
}