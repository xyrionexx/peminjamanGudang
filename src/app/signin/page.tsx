"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Github, Chrome, Loader2 } from "lucide-react";

export default function Signin() {
	const { status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-50'>
				<div className='flex items-center gap-2 text-gray-600'>
					<Loader2 className='h-4 w-4 animate-spin' />
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	if (status === "authenticated") {
		router.push("/home");
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
			<div className='w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200'>
				<div className='p-6 text-center border-b border-gray-100'>
					<h1 className='text-2xl font-bold text-gray-900 mb-2'>Sign In</h1>
					<p className='text-gray-600 text-sm'>
						Choose your preferred sign-in method to continue
					</p>
				</div>
				<div className='p-6 space-y-4'>
					<button
						onClick={() => signIn("google", {callbackUrl: "/home", prompt: "login"})}
						className='w-full h-12 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 flex items-center justify-center gap-2 text-gray-700 font-medium'>
						<Chrome className='h-5 w-5' />
						Sign in with Google
					</button>
					<button
						onClick={() => signIn("github", {callbackUrl: "/home", prompt: "login"})}
						className='w-full h-12 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 flex items-center justify-center gap-2 text-gray-700 font-medium'>
						<Github className='h-5 w-5' />
						Sign in with GitHub
					</button>
				</div>
			</div>
		</div>
	);
}
