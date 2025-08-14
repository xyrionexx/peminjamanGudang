"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/herosection";
import Syaratketentuan from "@/components/syaratKetentuan";
import Image from "next/image";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <Syaratketentuan />

      <Footer />
    </>
  );
}
