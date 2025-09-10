"use client";

// TOOLS
import { Icon } from "@iconify/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// SHADCN
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// IMPORT MILIK SENDIRI / KITA
import { DataBarang } from "./dummyData";
import { B_Search } from "./Binary-Search";
import { EnhancedSearch } from "@/components/search";
import CardViews from "@/components/CardViews";
import { loading_circle } from "@/components/Loading";
import type { DataBarangType, FoundBarang } from "@/types/global";
import ProfileMenu from "@/components/ProfileMenu";
import CartSidebarBtn from "@/components/CartSidebarBtn";

type cartEventTypes = {
	key: string;
	newValue: FoundBarang[];
};

export const getBarangKeranjang = (): Map<number, FoundBarang> | null => {
	if (typeof window === "undefined") return null;

	const barangKeranjang: FoundBarang[] | null = JSON.parse(
		localStorage.getItem("cart") ?? "[]"
	);

	if (barangKeranjang === null) {
		return null;
	}

	return new Map(
		barangKeranjang?.map((barang: FoundBarang) => [barang.id, barang])
	);
};

export default function DaftarBarang() {
	// ANOTHER HOOK TOOLS
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

	// HOOKS FOR SEARCH RESULT
	const [dataFound, setDataFound] = useState<number | DataBarangType[] | null>(
		null
	);
	const [isFound, setIsFound] = useState<boolean>(false);

	// HOOKS FOR CART / KERANJANG
	const [barangKeranjang, setBarangKeranjang] = useState<Map<
		number,
		FoundBarang
	> | null>();

	// HOOK HANDLERS
	useEffect(() => {
		// AMBIL BARANG DARI KERANJANG
		setBarangKeranjang(getBarangKeranjang());
	}, []);

	useEffect(() => {
		// NANGKEP EVENT KETIKA HABIS MASUKAN BARANG KE KERANJANG
		window.addEventListener("cartUpdate", (event: Event) => {
			const customEvent = event as CustomEvent<cartEventTypes>;
			if (customEvent.detail.key === "cart") {
				setBarangKeranjang(
					new Map(
						customEvent.detail.newValue.map((barang: FoundBarang) => [
							barang.id,
							barang,
						])
					)
				);
			}
		});
	});

	// ACCOUNT LOG IN / LOG OUT VALIDATION
	if (status === "loading") {
		return loading_circle();
	}
	if (status === "unauthenticated") {
		router.push("/signin?callbackUrl=/daftarBarang");
	}

	// DATA BARANG SORTED VERSION
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
		if (searchValue.length === 0) {
			setIsFound(false);
			setDataFound(null);
			return;
		}

		const result: FoundBarang[] | null = B_Search(SortedBarangAZ, searchValue);
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

	const handleUpdateCart = () => {
		setBarangKeranjang(getBarangKeranjang());
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
								<CartSidebarBtn updateCart={handleUpdateCart} />
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
								dataFound.map((item, index) => (
									<div key={item.id}>
										<CardViews
											item={item}
											itemFromCart={barangKeranjang?.get(index)}
											signalFromCard={handleCardSignal}
										/>
									</div>
								))}

							{!isFound &&
								DataBarang.map((item, index) => {
									if (selectedCategory.length === 0) {
										return (
											<div key={item.id}>
												<CardViews
													item={item}
													itemFromCart={barangKeranjang?.get(item.id)}
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
													itemFromCart={barangKeranjang?.get(index)}
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
