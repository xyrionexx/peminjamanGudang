import type { DataBarangType } from "@/types/global";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as Kartu from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { JSX } from "react";
import { Button } from "./ui/button";

type CardViewsProps = {
	item?: DataBarangType | null;
	signalFromCard?: (pesan: string, ok: boolean) => void;
};

export default function CardViews({
	item,
	signalFromCard = () => {},
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

	const handle_AddToCart = (item: DataBarangType): void => {
		try {
			localStorage.setItem(item.nama, JSON.stringify(item));
			signalFromCard("Barang berhasil dimasukkan ke keranjang", true);
		} catch (error) {
			console.log("gagal menyimpan barang", error);
			signalFromCard("Barang gagal disimpan ke keranjang :(", false);
		}
	};

	// OBJECT
	return (
		<Card className='group hover:shadow-lg transition-all duration-200 hover:-translate-y-1'>
			<CardHeader className='p-0'>
				<div className='relative overflow-hidden rounded-t-lg'>
					<Image
						src={item?.gambar || "/placeholder.svg"}
						alt={item?.nama ?? "Item"}
						width={300}
						height={200}
						className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200'
					/>
					<div className='absolute top-3 right-3'>
						<Badge
							variant='secondary'
							className='bg-white/90 text-gray-700'>
							{item?.kategori}
						</Badge>
					</div>
				</div>
			</CardHeader>

			<CardContent className='p-4'>
				<CardTitle className='text-lg font-semibold text-gray-900 mb-2'>
					{item?.nama}
				</CardTitle>
				<p className='text-sm text-gray-600 mb-4 line-clamp-2'>{item?.desc}</p>

				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<div className='w-2 h-2 rounded-full bg-green-500'></div>
						<span className='text-sm font-medium text-gray-700'>
							Stok: {item?.stok}
						</span>
					</div>
					<Badge
						variant='outline'
						className='text-green-600 border-green-600'>
						Available
					</Badge>
				</div>
			</CardContent>

			<Kartu.CardFooter className='flex-col gap-2'>
				<Button
					variant={"default"}
					className='w-full bg-green-500 hover:bg-green-600'>
					Pesan sekarang
				</Button>
				<Button
					variant={"outline"}
					className='w-full border-green-500'
					onClick={() => handle_AddToCart(item)}>
					<p className='text-green-500'>Masukkan ke keranjang</p>
				</Button>
			</Kartu.CardFooter>
		</Card>
	);
}
