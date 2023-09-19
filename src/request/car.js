import { ModelCar, storeListCar } from "../pages/register/childs/newcar/state";
import { getCar } from "../services/car";
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
