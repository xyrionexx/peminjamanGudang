'use client';

import { SessionProvider } from 'next-auth/react';
import GetUserSession from './GetUserSession';

export default function SessionClient({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
