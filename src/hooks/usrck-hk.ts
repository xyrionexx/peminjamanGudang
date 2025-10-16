import { useState, useEffect } from 'react';
import api from '@/config/axiosConfig';

export const useUsrck = (token: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(!!token);
  const [isValidUser, setIsValidUser] = useState<boolean>(false);

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
        const res = await api.get('/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (isMounted) {
          setIsValidUser(res.status === 200 && res.data.isAuthenticated === true);
        }
      } catch (error) {
        if (isMounted) {
          setIsValidUser(false);
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

  return { isLoading, isValidUser };
};
