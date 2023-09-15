import * as api from "./api";

export async function getShowroom(path = "") {
    return await api.GET({
        route: "users",
        path
    })
}
