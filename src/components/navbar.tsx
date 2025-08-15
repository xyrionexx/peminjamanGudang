"use client";

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Link } from "react-scroll";

export default function Navbar() {
    const router: AppRouterInstance = useRouter();
    return (
			<header className='w-full bg-[#faf9ee] px-6 py-5 shadow-sm border-b border-[#eeeeee]/30 top-0 z-50 fixed'>
				<div className='flex items-center justify-between max-w-7xl mx-auto'>
					{/* Logo */}
					<div className='text-3xl font-bold text-[#d2c2af] tracking-tight'>
						G-Ware
					</div>

					{/* Center text */}
					<div className='text-[#a2af9b] font-semibold text-lg tracking-wide cursor-pointer hover:text-[#8fa085]'>
						<Link to="syarat" smooth={true} duration={500}>
							Syarat & Ketentuan
						</Link>
					</div>

					{/* Action buttons */}
					<div className='flex items-center gap-4'>
					<button
						onClick={() => router.push("/signin")}
						onMouseEnter={() => router.prefetch("/signin")}
						className='bg-[#a2af9b] text-white px-8 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:bg-[#8fa085] transform hover:-translate-y-0.5 transition-all duration-200 ease-out'>
							Login
						</button>
						<button
							onClick={() => router.push("/signin")}
							onMouseEnter={() => router.prefetch("/signin")}
							className='bg-[#a2af9b] text-white px-8 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:bg-[#8fa085] transform hover:-translate-y-0.5 transition-all duration-200 ease-out'>
							SignIn
						</button>
					</div>
				</div>
			</header>
		);
}