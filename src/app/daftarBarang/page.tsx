"use client";
import { Icon } from "@iconify/react";
import Image, { StaticImageData } from "next/image";
import dummyImage from "../assets/dummy.jpg";
import { Badge } from "@/components/ui/badge";
import Logo from "../assets/image.png";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
import { EnhancedSearch } from "@/components/search";
import { CardViews } from "@/components/CardViews";
import { loading_circle } from "@/components/Loading";

export default function DaftarBarang() {
	const { data: session, status } = useSession();
	const router = useRouter();

	// HOOKS FOR CATEGORY
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

	// HOOKS FOR SEARCH
	// const [searchValue, setSearchValue] = useState<string>("");
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
		return loading_circle();
	}

	if (status === "unauthenticated") {
		router.push("/signin?callbackUrl=/daftarBarang");
	}

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
			kategori: "Fotografi",
		},
		{
			id: 13,
			gambar: dummyImage,
			nama: "blackboard",
			desc: "blackboard magnetik untuk presentasi dan brainstorming.",
			stok: 7,
			kategori: "Peralatan Kantor",
		},
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

	const handleSearch = (searchValue: string): void => {
		if (searchValue.length === 0) {
			setIsFound(false);
			setDataFound(null);
			return;
		}

		const result: DataBarangType[] | null = B_Search(
			SortedBarangAZ,
			searchValue
		);
		if (result === undefined) return;
		setDataFound(result);
		setIsFound(true);

		console.log(result);
	};

	const handleReset = () => {
		// setSearchValue("");
		setIsFound(false);
		setDataFound(null);
		return
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
						<div className='search flex w-full max-w-lg pr-2'>
							<EnhancedSearch
								placeholder="Mangga cari barang disini"
								onSearch={handleSearch}
								onReset={handleReset}
								className="w-full"
							/>
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
										<li key={item.name}>
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
								<Drawer>
									<DrawerTrigger asChild>
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
										<DrawerHeader>
											<DrawerTitle>Are you absolutely sure?</DrawerTitle>
											<DrawerDescription>
												This action cannot be undone.
											</DrawerDescription>
										</DrawerHeader>
										<DrawerFooter className='flex gap-2'>
											<DrawerClose asChild>
												<Button
													variant='outline'
													size='sm'>
													Cancel
												</Button>
											</DrawerClose>
										</DrawerFooter>
									</DrawerContent>
								</Drawer>
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
								<Badge
									key={category}
									variant='outline'>
									{category}
								</Badge>
							))}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
							{isFound && CardViews(dataFound, null)}

							{!isFound &&
								DataBarang.map((item) => {
									if (selectedCategory.length === 0) {
										return <div key={item.id}>{CardViews(null, item)}</div>;
									}
									if (
										selectedCategory.length > 0 &&
										selectedCategory.includes(item.kategori)
									) {
										return <div key={item.id}>{CardViews(null, item)}</div>;
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
