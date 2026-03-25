import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect, Generated } from 'kysely'

interface Database {
    bio: {
        id: Generated<number>,
        firstName: string,
        lastName: string,
        gender: "male" | "female"
        userId: string
    }

    user: {
    id: string
    name: string | null
    email: string
    image: string | null
    emailVerified: number | null
    createdAt: string | null
    updatedAt: string | null
  }
}

// const databasePath = new URL('./sqlite.db', import.meta.url)
const databasePath = 'sqlite.db'

const dialect = new SqliteDialect({
    database: new SQLite(databasePath.toString())
})

export const database = new Kysely<Database>({ dialect })