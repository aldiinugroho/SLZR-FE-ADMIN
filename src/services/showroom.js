import * as api from "./api";

const ROUTE = "showroom"

export async function getShowroom(path = "") {
    return await api.GET({
        route: ROUTE,
        path: path
    })
}

export async function postShowroom(path = "",body = {}) {
    return await api.POST({
        route: ROUTE,
        path: path,
        body: body
    })
}

export async function patchShowroom(path = "",body = {}) {
    return await api.PATCH({
        route: ROUTE,
        path: path,
        body: body
    })
}

export async function deleteShowroom(path = "") {
    return await api.DELETE({
        route: ROUTE,
        path: path
    })
}
