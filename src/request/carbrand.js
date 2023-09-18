import { ModelDDBrand, storeDDBrand } from "../pages/register/childs/newcar/childs/newcarformsubmit/state"
import { getCarBrand } from "../services/carbrand"

export async function list() {
  try {
    storeDDBrand.getState().setloading()
    const result = await getCarBrand("/list")
    if (result.message !== "ok") throw result
    const parsedData = result.data?.data
    const mapped = parsedData.map((i) => new ModelDDBrand(i))
    storeDDBrand.getState().setdata(mapped)
  } catch (e) {
    storeDDBrand.getState().reset()
    throw e
  }
}
