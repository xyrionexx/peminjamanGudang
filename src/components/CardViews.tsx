import type { DataBarangType, FoundBarang } from "@/types/global";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { JSX, useRef, useState } from "react";
import { Button } from "./ui/button";
import { B_Search } from "@/app/daftarBarang/Binary-Search";

type CardViewsProps = {
	item: DataBarangType | null;
	signalFromCard: (pesan: string, ok: boolean) => void;
};

export const handle_RemoveFromCart = (nameItem: string): void => {
	try {
		var barang: DataBarangType[] = JSON.parse(
			localStorage.getItem("cart") ?? "[]"
		);
		barang = barang.sort((a, b) =>
			a.nama.toLowerCase().localeCompare(b.nama.toLowerCase())
		);

		const hasil: FoundBarang[] | null = B_Search(
			barang,
			nameItem
		);

		if (hasil === null) return;
		hasil.forEach((item) => {
			barang.splice(item.index, 1);
		});

		localStorage.setItem("cart", JSON.stringify(barang));
	} catch (error) {
		throw new Error("error nih");
	}
};

export default function CardViews({
	item,
	signalFromCard,
}: CardViewsProps): JSX.Element {
	const [statusItemTxt, setStatusItemTxt] = useState<
		"Masukkin ke keranjang" | "Buang dari keranjang"
	>("Masukkin ke keranjang");
	const btnRef = useRef<HTMLButtonElement>(null);

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

	const handle_AddToCart = (item: DataBarangType): void => {
		try {
			var barang: DataBarangType[] = JSON.parse(
				localStorage.getItem("cart") ?? "[]"
			);
			barang.push(item);
			localStorage.setItem("cart", JSON.stringify(barang));

			signalFromCard?.("Barang berhasil dimasukkan ke keranjang", true);
		} catch (error) {
			console.log("gagal menyimpan barang", error);
			signalFromCard?.("Barang gagal disimpan ke keranjang :(", false);
		}
	};

	const itemRemoveHandler = (itemName: string): void => { 
		try {
			handle_RemoveFromCart(itemName);
			signalFromCard("barang berhasil di buang dari keranjang", true);
		} catch (error) {
			signalFromCard("waduh ada yang error nih", false)
		}
	};

	// OBJECT
	return (
		<Card className='w-full max-w-sm mx-auto group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col'>
			<CardHeader className='p-0 flex-shrink-0'>
				<div className='relative overflow-hidden rounded-t-lg'>
					<Image
						src={item?.gambar || "/placeholder.svg"}
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
				<Button
					variant={"default"}
					className='w-full bg-green-500 hover:bg-green-600 h-10 text-sm'>
					<Icon
						icon='material-symbols:shopping-bag-outline'
						width='24'
						height='24'
					/>
					Pesan sekarang
				</Button>
				<Button
					ref={btnRef}
					variant={"outline"}
					className='w-full border-green-500 text-green-500 hover:bg-green-50 h-10 text-sm'
					onClick={(event) => {
						const btn_data = event.currentTarget;
						if (!btn_data.dataset.mode || btn_data.dataset.mode === "add") {
							handle_AddToCart(item);
							setStatusItemTxt("Buang dari keranjang");
							btn_data.dataset.mode = "remove";
						} else {
							itemRemoveHandler(item.nama);
							setStatusItemTxt("Masukkin ke keranjang");
							btn_data.dataset.mode = "add";
						}
					}}>
					{btnRef.current?.dataset.mode === "remove" ? (
						<Icon
							icon='bi:cart-x'
							width='16'
							height='16'
						/>
					) : (
						<Icon
							icon='vaadin:cart-o'
							width='16'
							height='16'
						/>
					)}
					{statusItemTxt}
				</Button>
			</CardFooter>
		</Card>
	);
}
