import { auth } from "~~/server/utils/auth"
import { database } from '~~/server/db/connection'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const result = await auth.api.signUpEmail({
            body,
            headers: getRequestHeaders(event)
        })

        const newUser = result.user


        await database
            .insertInto("bio")
            .values({
                firstName: body.name || newUser.name || "Пользователь",
                lastName: "",
                gender: true,
                userId: newUser.id
            })
            .execute()

        return result

    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error?.message || "Ошибка при регистрации"
        })
    }
})