import { ModelShowroom, storeListShowroom } from "../pages/register/childs/newshowroom/state";
import {deleteShowroom, getShowroom, postShowroom} from "../services/showroom";

export async function getList() {
    try {
        storeListShowroom.getState().setloading()
        const result = await getShowroom("/list")
        if (result.message !== "ok") throw result
        const parsedData = result.data?.data.map((i) => new ModelShowroom(i))
        storeListShowroom.getState().setdata(parsedData)
    } catch (e) {
        storeListShowroom.getState().reset()
        throw e?.rawmessage
    }
}

export async function create({
    showroomName = "",
    showroomAddress = "",
    showroomPhone = ""
}) {
    try {
        const reqData = {
            showroomName,
            showroomAddress,
            showroomPhone
        }
        console.log(reqData);
        storeListShowroom.getState().setloading()
        const result = await postShowroom("/create",reqData)
        if (result.message !== "ok") throw result
        const parsedData = result.data?.data.map((i) => new ModelShowroom(i))
        storeListShowroom.getState().setdata(parsedData)
        return true
    } catch (e) {
        storeListShowroom.getState().reset()
        throw e?.rawmessage
    }
}

export async function reqDelete(showroomId = "") {
    try {
        storeListShowroom.getState().setloading()
        const result = await deleteShowroom(`/${showroomId}`)
        if (result.message !== "ok") throw result
        const parsedData = result.data?.data.map((i) => new ModelShowroom(i))
        storeListShowroom.getState().setdata(parsedData)
        return true
    } catch (e) {
        storeListShowroom.getState().reset()
        throw e?.rawmessage
    }
}