"use client";

// SHADCN
//==========================
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";
//==========================

// REACT IMPORTS
//==========================
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { JSX } from "react";
import { useRouter } from "next/navigation";
//==========================

// IMPORT MILIK SENDIRI
// COMPONENTS
//==========================
import notification from "./notification";
//==========================
// FUNCTIONS
//==========================
import { handle_RemoveFromCart } from "@/scripts/cartHandler";
import { insertBarangEvent } from "../lib/LocalStorageEvent";
//==========================
// IMPORT TYPE
//==========================
import type { DataBarangType, FoundBarang } from "@/types/global";
//==========================

// TYPES
type CardViewsProps = {
	item: FoundBarang | null;
	itemFromCart?: FoundBarang | null;
};

// MAIN FUNCTION
export default function CardViews({
	item,
	itemFromCart,
}: CardViewsProps): JSX.Element {
	// STATES
	const router = useRouter();

	// CHECK WHETHER THE BOTH OF DATA IS EXIST OR NOT
	if (!item) {
		return (
			<Card className='p-4'>
				<CardContent>
					<p className='text-gray-500'>Data tidak tersedia</p>
				</CardContent>
			</Card>
		);
	}

	// FUNCTIONS //
	function removeWhitespaceAndLowercase(text: string): string {
		let result = "";
		for (let i = 0; i < text.length; i++) {
			const char = text[i];
			if (char !== " " && char !== "\t" && char !== "\n" && char !== "\r") {
				result += char.toLowerCase();
			}
		}
		return result;
	}
	const getCurrentBarang = (): void => {
		localStorage.setItem("barang", JSON.stringify(itemFromCart ?? item));
	};
	// END OF FUNCTIONS

	// HANDLERS //
	const handle_AddToCart = (item: DataBarangType): void => {
		try {
			var barang: FoundBarang[] = JSON.parse(
				localStorage.getItem("cart") ?? "[]"
			);

			barang.push({ ...item, addedToCart: true });

			localStorage.setItem("cart", JSON.stringify(barang));
			insertBarangEvent("cart", barang);
			notification({
				pesan: "Barang berhasil ditambahkan ke keranjang",
				ok: true,
			});
		} catch (error) {
			notification({
				pesan: "Gagal nyimpen barang ke keranjang :(",
				deskripsi: error,
				ok: false,
			});
			console.log("gagal menyimpan barang", error);
		}
	};
	
	const handleCartAction = () => {
		itemFromCart?.addedToCart
			? handle_RemoveFromCart(item.nama)
			: handle_AddToCart(item);
	};
	// END OF HANDLERS //

	// OBJECT
	return (
		<Card className='w-full max-w-sm mx-auto group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col'>
			<CardHeader className='p-0 flex-shrink-0'>
				<div className='relative overflow-hidden rounded-t-lg'>
					<Image
						src={item?.gambar || "https://picsum.photos/seed/picsum/200"}
						alt={item?.nama ?? "Item"}
						width={300}
						height={200}
						className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200'
					/>
					<div className='absolute top-2 right-2'>
						<Badge
							variant='secondary'
							className='bg-white/90 text-gray-700 text-xs'>
							{item?.kategori}
						</Badge>
					</div>
				</div>
			</CardHeader>

			<CardContent className='p-4 flex-1 flex flex-col justify-between min-h-0'>
				<div className='flex-1'>
					<CardTitle className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight'>
						{item?.nama}
					</CardTitle>
					<p className='text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed'>
						{item?.desc}
					</p>
				</div>

				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<div className='w-2 h-2 rounded-full bg-green-500'></div>
						<span className='text-sm font-medium text-gray-700'>
							Stok: {item?.stok}
						</span>
					</div>
					<Badge
						variant='outline'
						className='text-green-600 border-green-600 text-xs'>
						Available
					</Badge>
				</div>
			</CardContent>

			<CardFooter className='flex-col gap-3 p-4 pt-0 flex-shrink-0'>
				{/* TOMBOL PESAN SEKARANG */}
				<Button
					variant={"default"}
					className='w-full bg-green-500 hover:bg-green-600 h-10 text-sm'
					onClick={() =>
						router.push(
							`daftarBarang/${removeWhitespaceAndLowercase(item.nama)}`
						)
					}
					onMouseEnter={() => getCurrentBarang()}>
					<Icon
						icon='material-symbols:shopping-bag-outline'
						width='24'
						height='24'
					/>
					Pesan sekarang
				</Button>

				{/* TOMBOL MASUKKAN KE KERANJANG / BUANG DARI KERANJANG */}
				<Button
					variant={"outline"}
					className='w-full border-green-500 text-green-500 hover:bg-green-50 h-10 text-sm'
					onClick={() => {
						handleCartAction();
					}}>
					{itemFromCart?.addedToCart ? (
						<div className='flex flex-row gap-2'>
							<Icon
								icon='pepicons-pop:cart-off'
								width='20'
								height='20'
							/>
							<p>Buang dari keranjang</p>
						</div>
					) : (
						<div className='flex flex-row gap-2'>
							<Icon
								icon='ion:cart-outline'
								width='512'
								height='512'
							/>
							<p>Masukkan ke keranjang</p>
						</div>
					)}
				</Button>
			</CardFooter>
		</Card>
	);
}
