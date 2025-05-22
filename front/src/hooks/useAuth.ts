import {
  authQuery,
  useAuthQuery,
  useAuthSignOutMutation,
} from '@/lib/auth/authQueries';
import { queryClient, router } from '@/lib/router';
import { User } from '@/schemas/userSchemas';
import { useEffect } from 'react';

export type AuthenticationState = {
  user: User | undefined;
  pendingAuth: boolean;
  ensureAuth: () => Promise<User>;
  signOut: () => void;
  isAuthenticated: boolean;
};

/**
 * Hook to interacts with the user authentication state
 * Use the useAuthQuery to know if the user is available
 */
export const useAuth = (): AuthenticationState => {
  const { data, isPending, isStale } = useAuthQuery();
  const signOutMutation = useAuthSignOutMutation();

  useEffect(() => {
    router.invalidate();
  }, [data]);

  // Allows to wait for the query to be completed
  const ensureAuth = () => {
    return queryClient.ensureQueryData(authQuery);
  };

  const signOut = () => {
    signOutMutation.mutate();
  };

  return {
    user: data,
    pendingAuth: isPending || isStale,
    ensureAuth,
    signOut,
    isAuthenticated: data ? true : false,
  };
};
