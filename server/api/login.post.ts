import { auth } from "~~/server/utils/auth"
import { readBody, getHeaders } from "h3"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = new Headers(getHeaders(event) as Record<string, string>)

    const result = await auth.api.signInEmail({
        body,
        headers
    })

    return result
})