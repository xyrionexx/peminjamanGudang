export default function HeroSection() {
	return (
		<section className='relative min-h-screen flex items-center justify-between max-w-7xl mx-auto'>
			{/* Content */}
			<div className='relative z-10 px-4 max-w-4xl'>
				<h1 className='text-4xl md:text-6xl font-bold text-black mb-4 leading-tight'>
					SELAMAT DATANG DI   
				</h1>
				<h2 className='text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ddb64b] to-[#8b7e09] mb-12 leading-tight'>
					G-Ware
				</h2>

				<button className='bg-[#a2af9b] hover:bg-[#8a9682] text-[#ffffff] font-semibold text-lg px-8 py-4 rounded-full transition-colors duration-200 shadow-lg'>
					Pinjam Sekarang
				</button>
            </div>
            
            <div className='relative z-10 px-4 max-w-4xl'>
                <img src="https://picsum.photos/id/1015/800/600" alt="" className="w-full h-full object-cover" />
            </div>
		</section>
	);
}
