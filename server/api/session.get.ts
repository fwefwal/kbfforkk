import { auth } from '~~/server/utils/auth'
import { getHeaders } from 'h3'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: new Headers(getHeaders(event) as Record<string, string>),
  })

  if (!session) {
    return {
      authenticated: false,
      user: null,
    }
  }

  return {
    authenticated: true,
    user: session.user,
  }
})