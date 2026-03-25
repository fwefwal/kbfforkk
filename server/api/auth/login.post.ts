import { auth } from "~~/server/utils/auth"
// import fetch, { Headers, HeadersInit } from 'node-fetch';


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        // const headers = Headers
        const result = await auth.api.signInEmail({
            body,
            headers: getRequestHeaders(event)
        })

        return result

    } catch (error: any) {
        throw createError({
            statusCode: 401,
            statusMessage: error?.message || "Неверный email или пароль"
        })
    }
})