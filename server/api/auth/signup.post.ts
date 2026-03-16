import { auth } from "~~/server/utils/auth"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // TODO
    // Вызовите функцию регистрации из auth,
    // передайте в нее тело запроса и по
    // необходимости - отсутствующие поля.
    // Дождитесь результат и верните его.
})