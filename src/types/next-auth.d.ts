// src/types/next-auth.d.ts (or src/next-auth.d.ts)

import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

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
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    id: string;
    name?: string | null;
    username?: string | null;
    email?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
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
    // role?: string; // Optional: Add role if you plan to use it
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
