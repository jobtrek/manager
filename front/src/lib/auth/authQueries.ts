import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../router';
import { attemptUserLogin, getAuthenticatedUser, logOutUser } from './authApi';

/**
 * Get the currently authenticated user query
 */
export const authQuery = {
  queryKey: ['auth'],
  queryFn: getAuthenticatedUser,
  retry: false,
};

export const useAuthQuery = () => {
  return useQuery(authQuery);
};

export const useAuthSignInMutation = () => {
  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: attemptUserLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};

export const useAuthSignOutMutation = () => {
  return useMutation({
    mutationKey: ['sign-out'],
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.setQueryData(['auth'], null);
    },
  });
};
