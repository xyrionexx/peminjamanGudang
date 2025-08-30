"use client";
import { Icon } from "@iconify/react";
import Image, { StaticImageData } from "next/image";
import dummyImage from "../assets/dummy.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Logo from "../assets/image.png";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect, JSX } from "react";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import { B_Search } from "./Binary-Search";

export default function DaftarBarang() {
	const { data: session, status } = useSession();
	const router = useRouter();

	let [selectedCategory, setSelectedCategory] = useState<string[]>([]);

	const [category, setCategory] = useState<{ name: string; status: boolean }[]>(
		[
			{
				name: "Audio",
				status: false,
			},
			{
				name: "Elektronik",
				status: false,
			},
			{
				name: "Komputer",
				status: false,
			},
			{
				name: "Aksesoris",
				status: false,
			},
			{
				name: "Peralatan",
				status: false,
			},
			{
				name: "Sound",
				status: false,
			},
			{
				name: "Fotografi",
				status: false,
			},
		]
	);

	const [searchValue, setSearchValue] = useState<string>("");

	const [dataFound, setDataFound] = useState<DataBarangType[] | null>();

	const [isFound, setIsFound] = useState<boolean>(false);

	interface DataBarangType {
		id: number;
		gambar: StaticImageData;
		nama: string;
		desc: string;
		stok: number;
		kategori: string;
	}

	if (status === "loading") {
		return (
			<div className='flex items-center justify-center min-h-[200px]'>
				<div className='flex flex-col items-center space-y-4'>
					{/* Spinning circle loader */}
					<div className='relative'>
						<div className='w-12 h-12 border-4 border-gray-200 rounded-full'></div>
						<div className='absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
					</div>

					{/* Loading text with subtle animation */}
					<div className='flex items-center space-x-1'>
						<span className='text-gray-600 font-medium'>Loading</span>
						<div className='flex space-x-1'>
							<div className='w-1 h-1 bg-gray-400 rounded-full animate-bounce'></div>
							<div
								className='w-1 h-1 bg-gray-400 rounded-full animate-bounce'
								style={{ animationDelay: "0.1s" }}></div>
							<div
								className='w-1 h-1 bg-gray-400 rounded-full animate-bounce'
								style={{ animationDelay: "0.2s" }}></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (status === "unauthenticated") {
		router.push("/signin?callbackUrl=/daftarBarang");
	}

	const CardViews = (
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
				<Card
					className='group hover:shadow-lg transition-all duration-200 hover:-translate-y-1'>
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

	const DataBarang: DataBarangType[] = [
		{
			id: 1,
			gambar: dummyImage,
			nama: "Proyektor",
			desc: "Proyektor berkualitas tinggi untuk presentasi dan menonton film.",
			stok: 24,
			kategori: "Elektronik",
		},
		{
			id: 2,
			gambar: dummyImage,
			nama: "Speaker",
			desc: "Speaker portabel dengan suara jernih dan bass mantap.",
			stok: 12,
			kategori: "Audio",
		},
		{
			id: 3,
			gambar: dummyImage,
			nama: "Laptop",
			desc: "Laptop performa tinggi untuk kerja dan gaming ringan.",
			stok: 15,
			kategori: "Komputer",
		},
		{
			id: 4,
			gambar: dummyImage,
			nama: "Mikrofon",
			desc: "Mikrofon kondensor dengan kualitas audio profesional.",
			stok: 30,
			kategori: "Audio",
		},
		{
			id: 5,
			gambar: dummyImage,
			nama: "Kamera DSLR",
			desc: "Kamera DSLR dengan lensa kit untuk fotografi dan video.",
			stok: 8,
			kategori: "Fotografi",
		},
		{
			id: 6,
			gambar: dummyImage,
			nama: "Tripod",
			desc: "Tripod aluminium ringan untuk kamera dan smartphone.",
			stok: 18,
			kategori: "Aksesoris",
		},
		{
			id: 7,
			gambar: dummyImage,
			nama: "Monitor LED",
			desc: "Monitor Full HD dengan warna tajam dan refresh rate tinggi.",
			stok: 10,
			kategori: "Komputer",
		},
		{
			id: 8,
			gambar: dummyImage,
			nama: "Printer",
			desc: "Printer multifungsi untuk cetak, scan, dan fotokopi.",
			stok: 6,
			kategori: "Peralatan Kantor",
		},
		{
			id: 9,
			gambar: dummyImage,
			nama: "Scanner",
			desc: "Scanner dokumen resolusi tinggi untuk kebutuhan kantor.",
			stok: 5,
			kategori: "Peralatan Kantor",
		},
		{
			id: 10,
			gambar: dummyImage,
			nama: "Whiteboard",
			desc: "Whiteboard magnetik untuk presentasi dan brainstorming.",
			stok: 7,
			kategori: "Peralatan Kantor",
		},
		{
			id: 11,
			gambar: dummyImage,
			nama: "Monitor AMOLED",
			desc: "Monitor 4k dengan warna tajam dan refresh rate tinggi.",
			stok: 10,
			kategori: "Komputer",
		},
		{
			id: 12,
			gambar: dummyImage,
			nama: "Kamera Mirrorless",
			desc: "ya begitulah",
			stok: 15,
			kategori: "Fotorgrafi"
		}
	];

	const SortedBarangAZ: DataBarangType[] = DataBarang.sort((a, b) => {
		return a.nama.toLowerCase().localeCompare(b.nama.toLowerCase());
	});

	const handleCategory = (category: { name: string; status: boolean }) => {
		if (selectedCategory.includes(category.name)) {
			setSelectedCategory((prev) =>
				prev.filter((item) => item !== category.name)
			);
		} else {
			setSelectedCategory((prev) => [...prev, category.name]);
		}

		category.status = !category.status;
	};

	const handleClearAll = (): void => {
		setSelectedCategory([]);
		category.forEach((item) => {
			item.status = false;
		});
	};

	const handleSearch = (): void => {
		const result: DataBarangType[] | null = B_Search(
			SortedBarangAZ,
			searchValue
		);
		if (result === undefined) return;
		setDataFound(result);
		setIsFound(true);

		console.log(result);
	};

	return (
		<>
			<div className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md'>
				<div className='navbar'>
					<div className='logoTitle flex-col flex gap-2 py-5 px-10'>
						<div className='title flex items-center gap-3'>
							<Image
								src={Logo || "/placeholder.svg"}
								alt='Company Logo'
								height={80}
								width={80}
							/>
							<h1 className='text-black text-5xl font-bold flex items-center gap-2'>
								WELCOME TO THE G-WARE {session?.user?.name?.toUpperCase()}
								{/* sementara tombol logout nya disimpan disini dulu */}
								<Button
									className='ml-2 bg-[#8b3412]'
									variant='default'
									size='sm'
									onClick={() => signOut()}>
									Logout
								</Button>
							</h1>
						</div>
						<h2 className='text-black text-3xl'>Peminjaman Barang Gudang</h2>
					</div>
					<div className='searchMenu flex px-10 items-center justify-between pb-4'>
						<div className='search flex relative border-2 border-black rounded-full'>
							<input
								className='outline-none w-[30vw] py-1 px-2'
								type='text'
								placeholder='Tulis nama barang dengan benar ya...'
								onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
							/>
							<Button
								variant='ghost'
								onClick={handleSearch}>
								<Icon
									icon='line-md:search'
									width='24'
									height='24'
									style={{ color: "#000" }}
									className='absolute top-1 right-2'
								/>
							</Button>
						</div>
						<div className='menu flex gap-5'>
							<div className='kategori'>
								<ul className='flex text-black gap-5'>
									{(() => {
										if (selectedCategory.length > 0) {
											return (
												<Button
													variant='destructive'
													size='sm'
													onClick={handleClearAll}>
													Clear all
												</Button>
											);
										}
									})()}

									{category.map((item) => (
										<li>
											<Button
												variant={item.status ? "default" : "outline"}
												size='sm'
												onClick={() => {
													handleCategory(item);
												}}
												className='hover:text-gray-600 transition-colors'>
												{item.name}
											</Button>
										</li>
									))}
								</ul>
							</div>
							<div className='pinjam'>
								<button className='hover:bg-gray-100 p-2 rounded transition-colors'>
									<Drawer>
										{/* Trigger */}
										<DrawerTrigger>
											<Button variant='outline'>
												<Icon
													icon='fluent-mdl2:work-item'
													width='24'
													height='24'
													style={{ color: "#000" }}
												/>
											</Button>
										</DrawerTrigger>

										<DrawerContent>
											{/* Header */}
											<DrawerHeader>
												<DrawerTitle>Are you absolutely sure?</DrawerTitle>
												<DrawerDescription>
													This action cannot be undone.
												</DrawerDescription>
											</DrawerHeader>

											{/* Footer */}
											<DrawerFooter className='flex gap-2'>
												{/* <Button variant='default' size='sm' className='max-w-xl'>Submit</Button> */}
												<DrawerClose>
													<Button
														variant='outline'
														size='sm'>
														Cancel
													</Button>
												</DrawerClose>
											</DrawerFooter>
										</DrawerContent>
									</Drawer>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='DaftarBarang flex flex-col gap-4 pt-[280px]'>
				<div className='dataBarang flex flex-col'>
					<div className='daftarBaran flex flex-wrap shrink-0 gap-10 justify-center items-center'>
						{/* Badge */}
						<div className='flex gap-2'>
							{selectedCategory.map((category) => (
								<Badge variant='outline'>{category}</Badge>
							))}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
							{isFound && CardViews(dataFound, null)}

							{!isFound &&
								DataBarang.map((item) => {
									if (selectedCategory.length === 0) {
										return CardViews(null, item);
									}

									if (
										selectedCategory.length > 0 &&
										selectedCategory.includes(item.nama)
									) {
										return CardViews(null, item);
									}

									return null;
								})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
