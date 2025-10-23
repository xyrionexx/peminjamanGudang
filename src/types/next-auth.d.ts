// src/types/next-auth.d.ts (or src/next-auth.d.ts)

import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      username?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string | null;
      refreshToken?: string | null;
      role?: string;
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    id: string;
    name?: string | null;
    username?: string | null;
    email?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name?: string | null;
    username?: string | null;
    email?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    role?: string;
  }
}
