import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import api from '@/config/axiosConfig';

export default function GetUserSession({ children }: { children: ReactNode }) {
  const { update } = useSession();
  const [user, setUser] = useState();
  const [csrfToken, setCsrfToken] = useState<string>();

  useEffect(() => {
    (async () => {
      const res: AxiosResponse = await api.get('/csrf/');
      setCsrfToken(res.data.csrfToken);
    })();
  }, []);

  useEffect(() => {
    if (!csrfToken) return;

    api.defaults.headers['X-CSRFToken'] = csrfToken;

    api
      .post('/user/')
      .then((res: AxiosResponse) => {
        if (res.status === 200 && res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [csrfToken]);

  useEffect(() => {
    if (user) {
      update({ user: user });
    }
  }, [user]);

  return <>{children}</>;
}
