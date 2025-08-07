// src/types/next-auth.d.ts (or src/next-auth.d.ts)

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			role?: string;
		} & DefaultSession["user"];
	}
	interface User extends DefaultUser {
		role?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role?: string;
	}
}
