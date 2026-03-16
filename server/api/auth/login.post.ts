import { auth } from "~~/server/utils/auth"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // TODO
    // Вызовите функцию логина из auth,
    // передайте в нее тело запроса и 
    // заголовочные данные и getHeaders.
    // Дождитесь результат и верните его.
})