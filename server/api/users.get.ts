import { database } from '~~/server/db/connection'

export default defineEventHandler(async () => {
  const users = await database
    .selectFrom('bio')
    .innerJoin('user', 'user.id', 'bio.userId')
    .select([
      'user.id as id',
      'user.name as username',
      'user.email as email',
      'bio.firstName as firstName',
      'bio.lastName as lastName',
      'bio.gender as gender',
    ])
    .orderBy('bio.id asc')
    .execute()

  return users.map((user) => ({
    ...user,
    id: Number(user.id),
    maidenName: '',
    username: user.username ?? '',
  }))
})