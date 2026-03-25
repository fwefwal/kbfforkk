import { auth } from '../utils/auth'
import { database } from './connection'
import usersData from './users.json' with { type: "json" }

await database.schema
    .createTable("bio")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("firstName", "text", (col) => col.notNull())
    .addColumn("lastName", "text", (col) => col.notNull())
    .addColumn("gender", "text", (col) => col.notNull())
        // .addColumn("gender", "boolean", (col) => col.notNull())
    .addColumn("userId", "text", (col) => col.notNull())
    .execute()

for (const user of usersData["users"]) {
    try {
        const createdUser = await auth.api.signUpEmail({
            body: {
                name: user.username,
                email: user.email,
                password: user.password,
                image: user.image
            }
        })
// const m = user.gender === "male"
const AU = createdUser.user
await database
        .insertInto("bio")
        .values({
                firstName: user.firstName,
                lastName: user.lastName,
                // gender: m,
                // не знаю, не видет gender
                gender: user.gender as 'male' | 'female' || undefined,
                userId: AU.id,
        })
        .execute()

console.log(`user ${user.email}, + bio`)


        // TODO
        // Создавать записи в таблице bio используя kysely
        // и соответствующие данные из user и createdUser
} catch (error: any) {
        if (error?.message?.includes("уже есть") || error?.statusCode === 422) {
            console.log(`user ${user.email} уже есть`)
        } else {
            console.error(`error ${user.email}:`, error)
        }
    }
}