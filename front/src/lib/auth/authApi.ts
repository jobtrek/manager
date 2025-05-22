import { User, UserLoginDTO } from '@/schemas/userSchemas';
import { api } from '../apiUtils';

export const getAuthenticatedUser = (): Promise<User> => {
  return api.get('api/user').json();
};

export const attemptUserLogin = async (data: UserLoginDTO) => {
  // Need to get a X-XCRF-COOKIE first
  await api.get('sanctum/csrf-cookie');
  const res = await api
    .post('login', {
      json: data,
    })
    .json();
  return res;
};

export const logOutUser = async () => {
  return api.post('logout').json();
};
