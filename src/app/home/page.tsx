"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/herosection";
import Syaratketentuan from "@/components/syaratKetentuan";
import Footer from "@/components/footer";
import { JSX } from "react";
import { Element } from "react-scroll";

export default function HomePage(): JSX.Element {
	return (
		<>
			<Navbar />

			<HeroSection />
			<Element name='syarat'>
				<Syaratketentuan />
			</Element>

			<Footer />
		</>
	);
}
