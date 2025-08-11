"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/herosection";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <section
        className="w-screen h-screen "
        style={{ backgroundColor: "#FAF9EE" }}
      >
        <p className="font-bold" style={{ color: "#A2AF9B" }}>
          Syarat & Ketentuan
        </p>
      </section>
    </>
  );
}
