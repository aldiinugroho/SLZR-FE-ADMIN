import * as api from "./api";

export async function getShowroom(path = "") {
    return await api.GET({
        route: "showroom",
        path: path
    })
}

export async function postShowroom(path = "",body = {}) {
    return await api.POST({
        route: "showroom",
        path: path,
        body: body
    })
}

export async function patchShowroom(path = "",body = {}) {
    return await api.PATCH({
        route: "showroom",
        path: path,
        body: body
    })
}

export async function deleteShowroom(path = "") {
    return await api.DELETE({
        route: "showroom",
        path: path
    })
}
