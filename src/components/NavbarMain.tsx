"use client";

// REACT
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// SHADCN
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";

// ICON
import { Icon } from "@iconify/react/dist/iconify.js";

// IMPORT MILIK KITA SENDIRI
// COMPONENTS
import ProfileMenu from "./ProfileMenu";
import CartSidebarBtn from "./CartSidebarBtn";
// FUNCTIONS
import { EnhancedSearch } from "./search";
import { B_Search } from "@/scripts/Binary-Search";
import { MappedDataBarang } from "@/data/barangApi";
import { FoundBarang } from "@/types/global";
import { BarangEvent } from "@/lib/LocalStorageEvent";

export default function MainNavbar() {
	// HOOKS
	const { data: session } = useSession();
	const router: AppRouterInstance = useRouter();

	// DATA SEARCH REQUIREMENTS (HOOKS)
	const [dataFound, setDataFound] = useState<FoundBarang[] | null>([]);
	const [searchHistory, setSearchHistory] = useState<string[]>([
		"laptop",
		"wong saya sukak kok",
		"nye nye nye bapana tukang batagor",
	]);

	// HANDLERS
	const handleSearch = (searchValue: string): void => {
		const huruf: string = searchValue[0].toLowerCase();

		if (!dataFound) return;

		router.push(
			"/daftarBarang?barang=" +
				dataFound.map((item: FoundBarang) => item.index).join(",") +
				"&cat=" +
				huruf
		);

		BarangEvent({ judulEvent: "PencarianBarangDitemukan" });
	};

	// searchOnChange itu maksudnya adalah searchOnType
	const handleSearchOnChange = (searchValue: string): void => {
		const huruf: string = searchValue[0].toLowerCase();
		const daerahSearchBarang: FoundBarang[] | undefined =
			MappedDataBarang.get(huruf);

		if (daerahSearchBarang == null) return;

		const hasil: FoundBarang[] | null = B_Search(
			daerahSearchBarang,
			searchValue
		);

		setDataFound(hasil);
	};

	const handleReset = (): void => {
		setDataFound([]);
		BarangEvent({ judulEvent: "resetPencarian" });
		router.push("/daftarBarang");
	};

	return (
		<div className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md'>
			<div className='navbar flex items-center py-4 px-10 gap-5'>
				{/* LOGO */}
				<div>
					<Link
						href={"/daftarBarang"}
						className='cursor-pointer'>
						<h1 className='text-2xl font-bold text-[#A2AF9B]'>G-WARE</h1>
					</Link>
				</div>

				{/* SEARCH BAR */}
				<div className='flex flex-1'>
					<EnhancedSearch
						placeholder='Mangga cari barang disini'
						onSearch={handleSearch}
						searchOnChange={handleSearchOnChange}
						onReset={handleReset}
						searchHistory={searchHistory}
						dataFound={dataFound}
					/>
				</div>

				{/* TOMBOL KERANGJANG SIDE RIGHT BAR */}
				<div>
					<CartSidebarBtn />
				</div>

				{/* NOTIFIKASI */}
				<div className='cursor-pointer'>
					<Icon
						icon='mdi:bell-outline'
						width='20'
						height='20'
					/>
				</div>

				{/* SEPARATOR */}
				<div className='h-7'>
					<Separator orientation='vertical' />
				</div>

				{/* AVATAR */}
				<div className='flex gap-3 justify-center items-center'>
					<Avatar>
						<AvatarImage
							src={
								session?.user.image ?? "https://avatar.iran.liara.run/public"
							}
						/>
						<AvatarFallback>ID</AvatarFallback>
					</Avatar>

					<p className='flex shrink-0 whitespace-nowrap'>
						{session?.user.name}
					</p>

					<ProfileMenu />
				</div>
			</div>
		</div>
	);
}
