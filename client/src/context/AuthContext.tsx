import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { fetchCurrentUser, logoutUser, refreshAccessToken } from '@/api/auth.api';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse, IUser } from '@/types';

interface AuthContextValue {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  setSession: (payload: AuthResponse) => void;
  refreshCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user, accessToken, setAuth, clearAuth, setAccessToken } = useAuthStore();
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const currentToken = useAuthStore.getState().accessToken;

        if (!currentToken) {
          const refreshed = await refreshAccessToken();
          useAuthStore.getState().setAccessToken(refreshed.accessToken);
        }

        const currentUser = await fetchCurrentUser();
        const latestToken = useAuthStore.getState().accessToken;

        if (isMounted && latestToken) {
          useAuthStore.getState().setAuth(currentUser, latestToken);
        }
      } catch {
        if (isMounted) {
          clearAuth();
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, [clearAuth]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isBootstrapping,
      setSession: (payload) => {
        setAuth(payload.user, payload.accessToken);
      },
      refreshCurrentUser: async () => {
        const currentUser = await fetchCurrentUser();
        const latestToken = useAuthStore.getState().accessToken;

        if (latestToken) {
          setAuth(currentUser, latestToken);
        }
      },
      logout: async () => {
        try {
          await logoutUser();
        } finally {
          clearAuth();
          setAccessToken(null);
        }
      }
    }),
    [accessToken, clearAuth, isBootstrapping, setAccessToken, setAuth, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

