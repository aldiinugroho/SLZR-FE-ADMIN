import {getShowroom} from "../services/showroom";

export async function getList() {
    try {
        const result = await getShowroom("?page=2")
        console.log(result)
    } catch (e) {
    }
}
