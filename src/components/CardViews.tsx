"use client";

// SHADCN
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";

// REACT IMPORTS
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { JSX, useState } from "react";

// IMPORT MILIK SENDIRI
import { B_Search } from "@/app/daftarBarang/Binary-Search";
import { insertBarangEvent } from "../lib/LocalStorageEvent";

// IMPORT TYPE MILIK SENDIRI
import type { DataBarangType, FoundBarang } from "@/types/global"; 

// TYPES
type CardViewsProps = {
	item: FoundBarang | null;
	itemFromCart?: FoundBarang | null;
	signalFromCard: (pesan: string, ok: boolean) => void;
};

// EXPORT HANDLERS
export const handle_RemoveFromCart = (nameItem: string): boolean => {
	try {
		var barang: DataBarangType[] = JSON.parse(
			localStorage.getItem("cart") ?? "[]"
		);
		barang = barang.sort((a, b) =>
			a.nama.toLowerCase().localeCompare(b.nama.toLowerCase())
		);

		const hasil: FoundBarang[] | null = B_Search(barang, nameItem);

		if (hasil === null) return false;
		hasil.forEach((item) => {
			if (item?.index == null) return;
			barang.splice(item.index, 1);
		});

		localStorage.setItem("cart", JSON.stringify(barang));
		insertBarangEvent("cart", barang);
		return true;
	} catch (error) {
		throw new Error("error nih");
	}
};

export default function CardViews({
	item,
	itemFromCart,
	signalFromCard,
}: CardViewsProps): JSX.Element {
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

	// HANDLERS
	const handle_AddToCart = (item: DataBarangType): void => {
		try {
			var barang: FoundBarang[] = JSON.parse(
				localStorage.getItem("cart") ?? "[]"
			);
			barang.push({ ...item, addedToCart: true });
			
			localStorage.setItem("cart", JSON.stringify(barang));
			insertBarangEvent("cart", barang);
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
			signalFromCard("waduh ada yang error nih", false);
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
				{/* TOMBOL PESAN SEKARANG */}
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

				{/* TOMBOL MASUKKAN KE KERANJANG / BUANG DARI KERANJANG */}
				<Button
					variant={"outline"}
					className='w-full border-green-500 text-green-500 hover:bg-green-50 h-10 text-sm'
					onClick={() => {
						if (itemFromCart?.addedToCart) {
							const result: boolean = handle_RemoveFromCart(item.nama);
							if (result) {
								signalFromCard("berhasil buang barang dari keranjang!", true);
							} else {
								signalFromCard(
									"aduhhh... kebelet eek",
									false
								);
							}
						} else {
							handle_AddToCart(item);
						}
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
