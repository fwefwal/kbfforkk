import { database } from '~~/server/db/connection'

export default defineEventHandler(async (event) => {
  const limit = Number(getQuery(event).limit) || 5
  const offset = Number(getQuery(event).offset) || 0

  const users = await database
    .selectFrom('bio')
    .innerJoin('user', 'user.id', 'bio.userId')
    .select([
      'bio.firstName',
      'bio.lastName',
      'bio.gender',
      'user.email',
      'user.name as username',
      'user.image',
      'bio.userId as id'
    ])
    .limit(limit)
    .offset(offset)
    .execute()

  const totalResult = await database
    .selectFrom('bio')
    .select(database.fn.countAll().as('count'))
    .executeTakeFirst()

  const total = Number(totalResult?.count) || 0
  const hasMore = offset + users.length < total

  return {
    users,
    hasMore
  }
})