import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { JWT } from 'next-auth/jwt';
import api from '@/config/axiosConfig';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AxiosResponse } from 'axios';

const loginProviders = [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
    }),
    CredentialsProvider({
      name: 'django',
      type: 'credentials',

      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'rememberMe', type: 'checkbox' },
      },

      async authorize(credentials) {
        try {
          if (!credentials) return null;

          const res: AxiosResponse = await api.post('/login/', credentials);
          const user = res.data;

          if (res.status !== 200 && !user) {
            return null;
          }

          return {
            id: (user.id as string) || '',
            name: (user.username as string) || null,
            email: (user.email as string) || null,
            accessToken: (user.access as string) || null,
            refreshToken: (user.refresh as string) || null,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
];

const handler = NextAuth({
  providers: loginProviders,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, trigger, user, session }): Promise<JWT> {
      if (trigger === 'update' && session?.accessToken) {
        token.accessToken = session.accessToken;
        token.refreshToken = session.refreshToken;
      }

      if (user) {
        token.id = user.id ?? token.sub ?? '';
        token.name = user.name ?? '';
        token.email = user.email ?? '';
        token.accessToken = (user as { accessToken?: string }).accessToken ?? '';
        token.refreshToken = (user as { refreshToken?: string }).refreshToken ?? '';
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string, // Ensure id is a string
        name: token.name || null,
        email: token.email || null,
        image: session.user?.image || null,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
