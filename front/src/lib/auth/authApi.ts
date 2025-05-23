import {
  UserAuthenticated,
  UserLoginDTO,
} from '@/domain/auth/authUserSchema.ts'
import { api } from '../apiUtils'

export const getAuthenticatedUser = (): Promise<UserAuthenticated> => {
  return api.get('api/user').json()
}

export const attemptUserLogin = async (data: UserLoginDTO) => {
  // Need to get a X-XCRF-COOKIE first
  await api.get('sanctum/csrf-cookie')
  return await api
    .post('login', {
      json: data,
    })
    .json()
}

export const logOutUser = async () => {
  return api.post('logout').json()
}
