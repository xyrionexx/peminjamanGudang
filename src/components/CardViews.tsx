import type { DataBarangType } from "@/types/global";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";
import { JSX } from "react";

export const CardViews = (
	itemArray: DataBarangType[] | undefined | null,
	item: DataBarangType | undefined | null
): JSX.Element => {
	// CHECK WHETHER THE BOTH OF DATA IS EXIST OR NOT
	if (!itemArray && !item) {
		return (
			<Card className='p-4'>
				<CardContent>
					<p className='text-gray-500'>Data tidak tersedia</p>
				</CardContent>
			</Card>
		);
	}

	// OBJECT
	if (!itemArray) {
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
					<p className='text-sm text-gray-600 mb-4 line-clamp-2'>
						{item?.desc}
					</p>

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
			</Card>
		);
	}

	// ARRAY OF OBJECT
	return (
		<>
			{itemArray?.map((barang) => (
				<Card
					key={barang.id}
					className='group hover:shadow-lg transition-all duration-200 hover:-translate-y-1'>
					<CardHeader className='p-0'>
						<div className='relative overflow-hidden rounded-t-lg'>
							<Image
								src={barang.gambar || "/placeholder.svg"}
								alt={barang.nama ?? "Item"}
								width={300}
								height={200}
								className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200'
							/>
							<div className='absolute top-3 right-3'>
								<Badge
									variant='secondary'
									className='bg-white/90 text-gray-700'>
									{barang.kategori}
								</Badge>
							</div>
						</div>
					</CardHeader>

					<CardContent className='p-4'>
						<CardTitle className='text-lg font-semibold text-gray-900 mb-2'>
							{barang.nama}
						</CardTitle>
						<p className='text-sm text-gray-600 mb-4 line-clamp-2'>
							{barang.desc}
						</p>

						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<div className='w-2 h-2 rounded-full bg-green-500'></div>
								<span className='text-sm font-medium text-gray-700'>
									Stok: {barang.stok}
								</span>
							</div>
							<Badge
								variant='outline'
								className='text-green-600 border-green-600'>
								Available
							</Badge>
						</div>
					</CardContent>
				</Card>
			))}
		</>
	);
};
