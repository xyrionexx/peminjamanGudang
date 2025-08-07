import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

export const LoginProvider = {
	provider: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT! as string,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET! as string,
		}),
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID! as string,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET! as string,
		}),
	],
};

const handler = NextAuth({
	providers: LoginProvider.provider,
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30, // 30 days
	},
	callbacks: {
		async jwt({ token, user }): Promise<JWT> {
			if (user) {
				token.id = user.id ?? token.sub ?? "";
			}
			return token;
		},
		async session({ session, token }) {
			session.user =
				session.user || {
					id: token.id as string, // Ensure id is a string
					name: token.name || null,
					email: token.email || null,
					image: token.picture || null,
				} ||
				{};
			session.user.id = (token.id as string) ?? ""; // Ensure id is a string
			return session;
		},
	},
});

export { handler as GET, handler as POST };
