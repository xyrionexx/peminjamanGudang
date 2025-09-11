import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "./ui/button";

export default function HeroSection() {
	return (
		<section className='relative min-h-screen flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-8 lg:py-0 gap-8 lg:gap-12'>
			{/* Content */}
			<div className='relative z-10 w-full lg:max-w-4xl text-center lg:text-left'>
				<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#A2AF9B] mb-2 sm:mb-4 leading-tight'>
					Booking
				</h1>
				<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-black mb-2 sm:mb-4 leading-tight'>
					peminjamanmu di
				</h1>
				<h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ddb64b] to-[#8b7e09] mb-8 sm:mb-12 leading-tight'>
					G-Ware
				</h2>

				<div className='flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center lg:justify-start'>
					<Link href='/daftarBarang'>
						<button className='w-full sm:w-auto bg-[#a2af9b] hover:bg-[#8a9682] text-[#ffffff] font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-colors duration-200 shadow-2xl shadow-[#a2af9b]'>
							Pinjam Sekarang
						</button>
					</Link>
					<ScrollLink
						to='syarat'
						smooth={true}
						duration={500}>
						<Button
							variant={"outline"}
							size={"lg"}
							className='w-full sm:w-auto underline bg-transparent'>
							Syarat & Ketentuan
						</Button>
					</ScrollLink>
				</div>
			</div>

			{/* IMAGE */}
			<div className='relative z-10 w-full lg:max-w-lg xl:max-w-xl'>
				<img
					src='https://picsum.photos/id/1015/640/480'
					alt='G-Ware booking illustration'
					className='w-full h-64 sm:h-80 md:h-96 lg:h-full max-h-[500px] object-cover rounded-lg shadow-lg'
				/>
			</div>
		</section>
	);
}
