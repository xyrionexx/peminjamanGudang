"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Github, Chrome, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Signin() {
	const { status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return (
			<div className='flex items-center justify-center min-h-[200px]'>
				<div className='flex flex-col items-center space-y-4'>
					{/* Spinning circle loader */}
					<div className='relative'>
						<div className='w-12 h-12 border-4 border-gray-200 rounded-full'></div>
						<div className='absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
					</div>

					{/* Loading text with subtle animation */}
					<div className='flex items-center space-x-1'>
						<span className='text-gray-600 font-medium'>Loading</span>
						<div className='flex space-x-1'>
							<div className='w-1 h-1 bg-gray-400 rounded-full animate-bounce'></div>
							<div
								className='w-1 h-1 bg-gray-400 rounded-full animate-bounce'
								style={{ animationDelay: "0.1s" }}></div>
							<div
								className='w-1 h-1 bg-gray-400 rounded-full animate-bounce'
								style={{ animationDelay: "0.2s" }}></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const callbackURL = () => {
		const fullUrl = new URL(window.location.href);
		const urlParam = new URLSearchParams(fullUrl.search);
		return urlParam.get("callbackUrl") || "/";
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
			<div className='w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col gap-5'>
				<div className='p-6 text-center border-b border-gray-100'>
					<h1 className='text-2xl font-bold text-gray-900 mb-2'>Sign In</h1>
					<p className='text-gray-600 text-sm'>
						Choose your preferred sign-in method to continue
					</p>
				</div>
				<div className='p-6 space-y-4'>
					<button
						onClick={() =>
							signIn("google", { callbackUrl: callbackURL(), prompt: "login" })
						}
						className='w-full h-12 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 flex items-center justify-center gap-2 text-gray-700 font-medium'>
						<Chrome className='h-5 w-5' />
						Sign in with Google
					</button>
					<button
						onClick={() =>
							signIn("github", { callbackUrl: callbackURL(), prompt: "login" })
						}
						className='w-full h-12 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 flex items-center justify-center gap-2 text-gray-700 font-medium'>
						<Github className='h-5 w-5' />
						Sign in with GitHub
					</button>
				</div>

				<div className='flex justify-center border-t border-gray-200 pt-5'>
					<Link href="/" className="text-[#41218b] text-center font-semibold mb-5">Back to home</Link>
				</div>
			</div>
		</div>
	);
}
