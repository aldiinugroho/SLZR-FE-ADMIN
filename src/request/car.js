import { ModelCar, storeListCar } from "../pages/register/childs/newcar/state";
import { getCar, postCar } from "../services/car";
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
    // storeListCar.getState().setloading()
    const carBrand = JSON.parse(params.carBrand)
    const carFuel = JSON.parse(params.carFuel)
    const carShowroom = JSON.parse(params.carShowroom)
    const carTransmission = JSON.parse(params.carTransmission)
    const carYear = JSON.parse(params.carYear)
    const carImage = JSON.parse(params.carImage)
    const carOtherPrice = params.carOtherPrice === "" ? [] : JSON.parse(params.carOtherPrice)
    const reqData = {
      "showroomId": carShowroom.showroomId,
      "carBrandId": carBrand.carBrandId,
      "carPlate": params.carPlate,
      "carName": params.carName,
      "carDescription": params.carDesc,
      "carTransmission": carTransmission.name,
      "carFuel": carFuel.name,
      "carTax": new Date(params.carTax),
      "carSTNK": params.carSTNK,
      "carBPKB": params.carBPKB,
      "carYear": carYear.name,
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
    // const result = await postCar("/create",reqData)
    // if (result.message !== "ok") throw result
    // console.log(result);
    // const parsedData = result.data?.data.map((i) => new ModelCar(i))
    // storeListCar.getState().setdata(parsedData)
  } catch (e) {
    // storeListCar.getState().reset()
    throw e?.rawmessage
  }
}
