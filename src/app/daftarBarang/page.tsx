"use client";

// TOOLS REACT / NEXT
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// SHADCN
import { toast } from "sonner";
import * as Pagination from "@/components/ui/pagination";

// IMPORT MILIK SENDIRI / KITA
import { DataBarang } from "./dummyData";
import { B_Search } from "./Binary-Search";
import CardViews from "@/components/CardViews";
import { loading_circle } from "@/components/Loading";
import type { DataBarangType, FoundBarang } from "@/types/global";
import Footer from "@/components/footer";
import MainNavbar from "@/components/NavbarMain";

// TYPES
type cartEventTypes = {
	key: string;
	newValue: FoundBarang[];
};

// EXPORT FUNCTION
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
	const router: AppRouterInstance = useRouter();

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
	const [searchBarang, setSearchBarang] = useState<number[]>();

	// HOOKS FOR CART / KERANJANG
	const [barangKeranjang, setBarangKeranjang] = useState<Map<
		number,
		FoundBarang
	> | null>();

	// HOOK HANDLERS
	// AMBIL BARANG AWAL DARI KERANJANG
	useEffect(() => {
		setBarangKeranjang(getBarangKeranjang());
	}, []);

	// NANGKEP EVENT KETIKA HABIS MASUKAN BARANG KE KERANJANG
	useEffect(() => {
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
	}, []);

	// MENGAMBIL HASIL SEARCH DARI URL PARAMETER
	useEffect(() => {
		const params: URLSearchParams = new URLSearchParams(window.location.search);
		const barangParam: string | null = params.get("barang");
		if (barangParam == null) return;
		setSearchBarang(
			barangParam
				.split(",")
				.map((indexBarang: string) => Number(indexBarang))
		);
	}, []);

	// NGECEK STATUS PENGGUNA
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/signin?callbackUrl=/daftarBarang");
		}
	}, [status, router]);

	// ACCOUNT LOG IN / LOG OUT VALIDATION
	if (status === "loading") {
		return loading_circle();
	}

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

	// HANDLE CLEAR ALL CATEGORY
	const handleClearAll = (): void => {
		setSelectedCategory([]);
		category.forEach((item) => {
			item.status = false;
		});
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
			<MainNavbar />

			{/* MAIN CONTENT */}
			<div className='flex flex-col py-20'>
				{/* DAFTAR BARANG */}
				<div className='flex flex-wrap shrink-0 gap-10 justify-center'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>


						{/* NGERENDER SELURUH BARANG YANG ADA */}
						{DataBarang.map((item, index) => {
							// NGERENDER SELURUH BARANG YANG ADA
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

							// NGERENDER SELURUH BARANG BERDASARKAN KATEGORI
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

							// KALO NGGA ADA BARANG SAMA SEKALI YA RETURN NULL
							return null;
						})}
					</div>
				</div>

				{/* PAGINATION */}
				<div className='mt-10'>
					<Pagination.Pagination>
						<Pagination.PaginationContent>
							{/* PREVIOUS PAGE */}
							<Pagination.PaginationItem>
								<Pagination.PaginationPrevious href='#' />
							</Pagination.PaginationItem>

							{/* NUMBER SELECTION OF PAGES */}
							<Pagination.PaginationItem>
								<Pagination.PaginationLink
									href='#'
									isActive>
									1
								</Pagination.PaginationLink>
							</Pagination.PaginationItem>
							<Pagination.PaginationItem>
								<Pagination.PaginationLink href='#'>
									2
								</Pagination.PaginationLink>
							</Pagination.PaginationItem>
							<Pagination.PaginationItem>
								<Pagination.PaginationLink href='#'>
									3
								</Pagination.PaginationLink>
							</Pagination.PaginationItem>

							{/* TITIK-TITIK */}
							<Pagination.PaginationItem>
								<Pagination.PaginationEllipsis />
							</Pagination.PaginationItem>

							{/* NEXT PAGE */}
							<Pagination.PaginationItem>
								<Pagination.PaginationNext href='#' />
							</Pagination.PaginationItem>
						</Pagination.PaginationContent>
					</Pagination.Pagination>
				</div>
			</div>

			{/* FOOTER */}
			<Footer />
		</>
	);
}
