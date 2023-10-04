import { LocalStorage } from "../configs/localstorage"

// STAGGING
const MAINURL = "https://sslzr-service-stagging.onrender.com/v1/"

async function responseParser(data = null, error = null) {
    const reqUrl = data?.url
    const parserMessage = {
        ok: "ok",
        failed: "failed",
        localerror: "localerror",
        servererror: "servererror"
    }
    try {
        if (data === null && error !== null) throw "Error Fetching with GET|POST|ETC."
        if (data?.status >= 200 && data?.status <= 299) {
            const paresdata = await data.json()
            return {
                data: paresdata,
                message: parserMessage.ok,
                status: data?.status,
                reqUrl
            }
        } else if (data?.status >= 300 && data?.status <= 399) {
            const paresdata = await data.json()
            return {
                data: null,
                message: parserMessage.failed,
                rawmessage: paresdata?.message,
                status: data?.status,
                reqUrl
            }
        } else if (data?.status >= 400 && data?.status <= 499) {
            const paresdata = await data.json()
            return {
                data: null,
                message: parserMessage.failed,
                rawmessage: paresdata?.message,
                status: data?.status,
                reqUrl
            }
        } else if (data?.status >= 500 && data?.status <= 599) {
            const paresdata = await data.json()
            return {
                data: null,
                message: parserMessage.failed,
                rawmessage: paresdata?.message,
                status: data?.status,
                reqUrl
            }
        } else {
            throw "Error No Status Served From Server"
        }
    } catch (e) {
        return {
            data: null,
            message: typeof e === "string" ? parserMessage.localerror : parserMessage.servererror,
            rawmessage: typeof e === "string" ? e : JSON.stringify(e),
            status: 0,
            reqUrl
        }
    }
}

const  baseHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async  function GET({
    headers = {},
    route = "",
    path = ""
}) {
    try {
        let requestOptions = {
            method: 'GET',
            headers: {
                ...baseHeaders,
                ...headers,
                Authorization: new LocalStorage().getToken() === null ? "" : `Bearer ${new LocalStorage().getToken()}`
            }
        };
        let urlReq = `${MAINURL}${route}${path}`
        const rawResponse = await fetch(urlReq, requestOptions);
        const parsedResponse = await responseParser(rawResponse)
        return parsedResponse
    } catch (error) {
        return await responseParser(null,error)
    }
}

async  function DELETE({
    headers = {},
    route = "",
    path = ""
}) {
    try {
        let requestOptions = {
            method: 'DELETE',
            headers: {
                ...baseHeaders,
                ...headers,
                Authorization: new LocalStorage().getToken() === null ? "" : `Bearer ${new LocalStorage().getToken()}`
            }
        };
        let urlReq = `${MAINURL}${route}${path}`
        const rawResponse = await fetch(urlReq, requestOptions);
        const parsedResponse = await responseParser(rawResponse)
        return parsedResponse
    } catch (error) {
        return await responseParser(null,error)
    }
}

async  function POST({
    body = {},
    headers = {},
    route = "",
    path = "",
    withBodyStringify = true,
    withBaseHeader = true
}) {
    try {
        let baseHeaderCustom = withBaseHeader ? baseHeaders : {}
        let requestOptions = {
            method: 'POST',
            headers: {
                ...baseHeaderCustom,
                ...headers,
                Authorization: new LocalStorage().getToken() === null ? "" : `Bearer ${new LocalStorage().getToken()}`
            },
            body: withBodyStringify ? JSON.stringify(body) : body
        };
        const rawResponse = await fetch(`${MAINURL}${route}${path}`, requestOptions);
        const parsedResponse = await responseParser(rawResponse)
        return parsedResponse
    } catch (error) {
        console.log("err",error);
        return await responseParser(null,error)
    }
}

async  function PATCH({
    body = {},
    headers = {},
    route = "",
    path = "",
    withBodyStringify = true
}) {
    try {
        let requestOptions = {
            method: 'PATCH',
            headers: {
                ...baseHeaders,
                ...headers,
                Authorization: new LocalStorage().getToken() === null ? "" : `Bearer ${new LocalStorage().getToken()}`
            },
            body: withBodyStringify ? JSON.stringify(body) : body
        };
        const rawResponse = await fetch(`${MAINURL}${route}${path}`, requestOptions);
        const parsedResponse = await responseParser(rawResponse)
        return parsedResponse
    } catch (error) {
        console.log("err",error);
        return await responseParser(null,error)
    }
}

export {
    GET,
    POST,
    DELETE,
    PATCH
}
