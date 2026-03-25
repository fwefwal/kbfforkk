import { auth } from '~~/server/utils/auth'
import { database } from '~~/server/db/connection'
import { getHeaders } from 'h3'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: new Headers(getHeaders(event) as Record<string, string>),
  })

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Пользователь не авторизован',
    })
  }

  const profile = await database
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
    .where('user.id', '=', session.user.id)
    .executeTakeFirst()

  if (!profile) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Профиль не найден',
    })
  }

  return {
    ...profile,
    id: Number(profile.id),
    maidenName: '',
    username: profile.username ?? '',
  }
})