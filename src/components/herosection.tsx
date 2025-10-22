import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { Button } from './ui/button';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import gambar from '../../public/1561.jpg';

export default function HeroSection() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <section className="relative min-h-screen flex items-center justify-between max-w-7xl mx-auto">
      {/* Content */}
      <div className="relative z-10 px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-[#A2AF9B] mb-4 leading-tight">
          Booking
        </h1>
        <h1 className="text-4xl md:text-6xl font-semibold text-black mb-4 leading-tight">
          peminjamanmu di
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ddb64b] to-[#8b7e09] mb-12 leading-tight">
          G-Ware
        </h2>

        <div className="flex gap-5 items-center">
          <Link href="/daftarBarang">
            <button
              onClick={() => setIsClicked((prev) => !prev)}
              className="bg-[#a2af9b] hover:bg-[#8a9682] text-[#ffffff] font-semibold text-lg px-8 py-4 rounded-full transition-colors duration-200 shadow-2xl shadow-[#a2af9b] flex-row gap-2 items-center flex"
            >
              {isClicked && <Icon icon="line-md:loading-loop" width="24" height="24" />}
              Pinjam Sekarang
            </button>
          </Link>
          <ScrollLink to="syarat" smooth={true} duration={500}>
            <Button variant={'outline'} size={'lg'} className="underline">
              Syarat & Ketentuan
            </Button>
          </ScrollLink>
        </div>
      </div>

      <div className="relative z-10 px-4 max-w-4xl">
        <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={gambar ?? 'https://picsum.photos/id/1015/640/480'}
            alt="Warehouse"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
