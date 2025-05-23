// valibot user schema
import * as v from 'valibot'

/**
 * This shema represents the authenticated user state, used by the authentication mechanism
 */
export const UserAuthenticatedSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  name: v.string(),
  roles: v.pipe(v.array(v.string()), v.minLength(1)),
})

export type UserAuthenticated = v.InferOutput<typeof UserAuthenticatedSchema>

/**
 * Schema for user login actions
 */
export const UserLoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
})

export type UserLoginDTO = v.InferOutput<typeof UserLoginSchema>
