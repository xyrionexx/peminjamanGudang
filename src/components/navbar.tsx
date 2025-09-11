"use client";

import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";

export default function Navbar() {
	const router: AppRouterInstance = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className='w-full bg-[#faf9ee] px-4 sm:px-6 py-5 shadow-sm border-b border-[#eeeeee]/30 top-0 z-50 fixed mb-4 sm:mb-6 md:mb-8'>
			<div className='flex items-center justify-between max-w-7xl mx-auto'>
				{/* Logo */}
				<div className='text-2xl sm:text-3xl font-bold text-[#6b5b47] tracking-tight'>
					G-Ware
				</div>

				<div className='hidden md:flex items-center gap-4'>
					<button
						onClick={() => router.push("/signin")}
						onMouseEnter={() => router.prefetch("/signin")}
						className='bg-[#a2af9b] text-white px-6 lg:px-8 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:bg-[#8fa085] transform hover:-translate-y-0.5 transition-all duration-200 ease-out'>
						Login
					</button>
					<button
						onClick={() => router.push("/signin")}
						onMouseEnter={() => router.prefetch("/signin")}
						className='bg-[#a2af9b] text-white px-6 lg:px-8 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:bg-[#8fa085] transform hover:-translate-y-0.5 transition-all duration-200 ease-out'>
						SignIn
					</button>
				</div>

				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className='md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5'
					aria-label='Toggle mobile menu'>
					<span
						className={`w-6 h-0.5 bg-[#a2af9b] transition-all duration-300 ${
							isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
						}`}></span>
					<span
						className={`w-6 h-0.5 bg-[#a2af9b] transition-all duration-300 ${
							isMobileMenuOpen ? "opacity-0" : ""
						}`}></span>
					<span
						className={`w-6 h-0.5 bg-[#a2af9b] transition-all duration-300 ${
							isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
						}`}></span>
				</button>
			</div>

			{isMobileMenuOpen && (
				<div className='md:hidden mt-4 pb-4 border-t border-[#eeeeee]/30'>
					<div className='flex flex-col gap-3 pt-4'>
						<button
							onClick={() => {
								router.push("/signin");
								setIsMobileMenuOpen(false);
							}}
							onMouseEnter={() => router.prefetch("/signin")}
							className='bg-[#a2af9b] text-white px-6 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:bg-[#8fa085] transition-all duration-200 ease-out w-full'>
							Login
						</button>
						<button
							onClick={() => {
								router.push("/signin");
								setIsMobileMenuOpen(false);
							}}
							onMouseEnter={() => router.prefetch("/signin")}
							className='bg-[#a2af9b] text-white px-6 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:bg-[#8fa085] transition-all duration-200 ease-out w-full'>
							SignIn
						</button>
					</div>
				</div>
			)}
		</header>
	);
}
