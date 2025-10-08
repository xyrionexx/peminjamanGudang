import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import api from "@/config/axiosConfig";
import CredentialsProvider from "next-auth/providers/credentials";
import { AxiosResponse } from "axios";

export const LoginProvider = {
	provider: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT! as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
		}),
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT! as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
		}),
		CredentialsProvider({
			name: "django",
			type: "credentials",

			credentials: {
				username: { label: "Username", type: "text" },
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
				rememberMe: { label: "rememberMe", type: "checkbox" },
			},

			async authorize(credentials) {
				try {
					if (!credentials) return null;

					const res: AxiosResponse = await api.post("/login/", credentials);
					const user = res.data;

					if (res.status !== 200 && !user) {
						return null;
					}

					return {
						id: (user.id as string) || "",
						name: (user.username as string) || null,
						email: (user.email as string) || null,
					};
				} catch (error) {
					console.error(error);
					return null;
				}
			},
		}),
	],
};

const handler = NextAuth({
	providers: LoginProvider.provider,
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 60,
	},
	jwt: {
		maxAge: 30 * 60,
	},
	callbacks: {
		async jwt({ token, user }): Promise<JWT> {
			if (user) {
				token.id = user.id ?? token.sub ?? "";
				token.name = user.name ?? "";
				token.email = user.email ?? "";
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id as string, // Ensure id is a string
				name: token.name || null,
				email: token.email || null,
				image: token.picture || null,
			};
			return session;
		},
	},
});

export { handler as GET, handler as POST };
