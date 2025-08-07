import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const LoginProvider = {
    provider: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID! as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET! as string,
        }),
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID! as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET! as string,
        })
    ]
}

export default NextAuth({
    providers: LoginProvider.provider,
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },
});
