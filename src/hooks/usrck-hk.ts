import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import api from '@/config/axiosConfig';
import { useSession } from 'next-auth/react';

export const useUsrck = (token: string) => {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(!!token);
  const [isValidUser, setIsValidUser] = useState<boolean>(false);
  const [statusError, setStatusError] = useState<number | null>(null);
  const [tokens, setTokens] = useState<{ access: string; refresh: string } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const checkUser = async () => {
      if (!token) {
        setIsValidUser(false);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const res: AxiosResponse<any, any, {}> = await api.get('/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (isMounted) {
          setIsValidUser(res.status === 200 && res.data.isAuthenticated === true);
        }
      } catch (error) {
        if (isMounted) {
          if (!axios.isAxiosError(error)) return;
          setIsValidUser(false);
          setStatusError(error.response?.status || null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkUser();
    return () => {
      isMounted = false;
    };
  }, [token]);

  useEffect(() => {
    const refreshTokens = async () => {
      if (statusError !== 401) return;

      try {
        const res = await api.post('/token/refresh/', {
          refresh: session?.user.refreshToken,
        });

        if (res.status === 200 && 'access' in res.data && 'refresh' in res.data) {
          setTokens(res.data);
        }
      } catch {
        setTokens(null);
      }
    };

    refreshTokens();
  }, [statusError]);

  useEffect(() => {
    if (tokens) {
      update({ accessToken: tokens.access, refreshToken: tokens.refresh });
    }
  }, [tokens]);

  return { isLoading, isValidUser };
};
