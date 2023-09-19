import { ModelDDShowroom, storeDDShowroom } from "../pages/register/childs/newcar/childs/newcarformsubmit/state";
import { ModelShowroomForm, storeShowroomForm } from "../pages/register/childs/newshowroom/childs/newshowroomformsubmit/state";
import { ModelShowroom, storeListShowroom } from "../pages/register/childs/newshowroom/state";
import {deleteShowroom, getShowroom, patchShowroom, postShowroom} from "../services/showroom";

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

export async function geDDList() {
    try {
        storeDDShowroom.getState().setloading()
        const result = await getShowroom("/list")
        if (result.message !== "ok") throw result
        const parsedData = result.data?.data.map((i) => new ModelDDShowroom(i))
        storeDDShowroom.getState().setdata(parsedData)
    } catch (e) {
        storeDDShowroom.getState().reset()
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

export async function detail(showroomId = "") {
    try {
        storeShowroomForm.getState().setloading()
        const result = await getShowroom(`/${showroomId}`)
        if (result.message !== "ok") throw result
        const parsedData = result.data?.data
        const remapped = new ModelShowroomForm(parsedData)
        storeShowroomForm.getState().setdata(remapped)
        return true
    } catch (e) {
        storeShowroomForm.getState().reset()
        throw e?.rawmessage
    }
}

export async function update({
    showroomId = "",
    showroomName = "",
    showroomAddress = "",
    showroomPhone = ""
}) {
    try {
        const reqData = {
            showroomId,
            showroomName,
            showroomAddress,
            showroomPhone
        }
        console.log(reqData);
        storeListShowroom.getState().setloading()
        const result = await patchShowroom("/update",reqData)
        if (result.message !== "ok") throw result
        const parsedData = result.data?.data.map((i) => new ModelShowroom(i))
        storeListShowroom.getState().setdata(parsedData)
        return true
    } catch (e) {
        storeListShowroom.getState().reset()
        throw e?.rawmessage
    }
}
