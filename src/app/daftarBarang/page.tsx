"use client";

// TOOLS
import { Icon } from "@iconify/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// SHADCN
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// IMPORT MILIK SENDIRI / KITA
import dummyImage from "../assets/dummy.jpg";
import { B_Search } from "./Binary-Search";
import { EnhancedSearch } from "@/components/search";
import CardViews from "@/components/CardViews";
import { loading_circle } from "@/components/Loading";
import type { DataBarangType } from "@/types/global";
import ProfileMenu from "@/components/ProfileMenu";
import CartSidebarBtn from "@/components/CartSidebarBtn";

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
	const [dataFound, setDataFound] = useState<number | DataBarangType[] | null>(
		null
	);
	const [isFound, setIsFound] = useState<boolean>(false);

	if (status === "loading") {
		return loading_circle();
	}

	if (status === "unauthenticated") {
		router.push("/signin?callbackUrl=/daftarBarang");
	}

	// DATA BARANG TYPE
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

	// HANLDERS
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
		debugger;
		if (searchValue.length === 0) {
			setIsFound(false);
			setDataFound(null);
			return;
		}

		const result:
			| (DataBarangType & {
					index: number;
			  })[]
			| null = B_Search(SortedBarangAZ, searchValue);
		if (result === null) return;
		setDataFound(result);
		setIsFound(true);
		console.log(result);
	};

	const handleReset = () => {
		setIsFound(false);
		setDataFound([]);
		return;
	};

	const handleCardSignal = (pesan: string, ok: boolean) => {
		toast(pesan, {
			icon: ok ? (
				<Icon
					icon='teenyicons:tick-circle-outline'
					width='15'
					height='15'
				/>
			) : (
				<Icon
					icon='f7:exclamationmark'
					width='56'
					height='56'
				/>
			),
			duration: 2000,
			position: "bottom-center",
			richColors: true,
		});
	};

	return (
		<>
			{/* NAVBAR */}
			<div className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md'>
				<div className='navbar flex items-center justify-center py-4'>
					<div className='searchMenu flex items-center justify-center mx-auto gap-5'>
						{/* AVATAR */}
						<div className='flex gap-3 justify-center items-center'>
							<Avatar>
								<AvatarImage
									src={
										session?.user.image ??
										"https://avatar.iran.liara.run/public"
									}
								/>
								<AvatarFallback>ID</AvatarFallback>
							</Avatar>

							<p className='flex shrink-0 whitespace-nowrap'>
								{session?.user.name}
							</p>

							<ProfileMenu />
						</div>

						{/* SEARCH BAR */}
						<div className='search flex w-full max-w-lg pr-2'>
							<EnhancedSearch
								placeholder='Mangga cari barang disini'
								onSearch={handleSearch}
								onReset={handleReset}
								className='w-full'
							/>
						</div>

						{/* KATEGORI */}
						<div className='menu flex gap-5 items-center'>
							<div className='kategori'>
								<ul className='flex text-black gap-5'>
									{/* TOMBOL RESET KATEGORI */}
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

									{/* TOMBOL-TOMBOL KATEGORI */}
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

							{/* TOMBOL KERANGJANG SIDE RIGHT BAR */}
							<div className='pinjam'>
								<CartSidebarBtn />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* MAIN CONTENT */}
			<div className='DaftarBarang flex flex-col gap-4 py-20'>
				<div className='dataBarang flex flex-col'>
					<div className='daftarBaran flex flex-wrap shrink-0 gap-10 justify-center'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
							{isFound &&
								Array.isArray(dataFound) &&
								dataFound.map((item) => (
									<div key={item.id}>
										<CardViews
											item={item}
											signalFromCard={handleCardSignal}
										/>
									</div>
								))}

							{!isFound &&
								DataBarang.map((item) => {
									if (selectedCategory.length === 0) {
										return (
											<div key={item.id}>
												<CardViews
													item={item}
													signalFromCard={handleCardSignal}></CardViews>
											</div>
										);
									}
									if (
										selectedCategory.length > 0 &&
										selectedCategory.includes(item.kategori)
									) {
										return (
											<div key={item.id}>
												<CardViews
													item={item}
													signalFromCard={handleCardSignal}></CardViews>
											</div>
										);
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
