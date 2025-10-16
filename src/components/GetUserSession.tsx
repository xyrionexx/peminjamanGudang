import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import api from '@/config/axiosConfig';
import { signOut } from 'next-auth/react';

export default function GetUserSession({ children }: { children: ReactNode }) {
  const { update } = useSession();
  const [user, setUser] = useState();
  const [csrfToken, setCsrfToken] = useState<string>();
  const [checkUser, setCheckUser] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('authenticationCheck', () => {
      setCheckUser((prev) => !prev);
    });
  }, []);

  useEffect(() => {
    if (csrfToken) return;
    (async () => {
      const res: AxiosResponse = await api.get('/csrf/');
      setCsrfToken(res.data.csrfToken);
    })();
  }, []);

  useEffect(() => {
    if (!csrfToken || !checkUser) return;

    api.defaults.headers['X-CSRFToken'] = csrfToken;

    api
      .post('/user/')
      .then((res: AxiosResponse) => {
        if (res.status === 200 && res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        if (err.response && [401, 403].includes(err.response.status)) {
          signOut();
        } else {
          console.error(err);
        }
      });
  }, [csrfToken, checkUser]);

  useEffect(() => {
    if (user) {
      update({ user: user });
    }
  }, [user]);

  return <>{children}</>;
}
