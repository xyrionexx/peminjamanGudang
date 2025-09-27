"use client";

// TOOLS REACT / NEXT
//==========================
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
//==========================

// SHADCN
//==========================
import * as Pagination from "@/components/ui/pagination";
//==========================

// IMPORT MILIK SENDIRI / KITA
//==========================
import { getBarangKeranjang } from "@/scripts/cartHandler";
import { DataBarang, MappedDataBarang } from "./dummyData";
import CardViews from "@/components/CardViews";
import { loading_circle } from "@/components/Loading";
import type { FoundBarang } from "@/types/global";
import Footer from "@/components/footer";
import MainNavbar from "@/components/NavbarMain";
//==========================

// TYPES
type cartEventTypes = {
	key: string;
	newValue: FoundBarang[];
};

export default function DaftarBarang() {
	// STATE //
	// ANOTHER STATE TOOLS
	//==========================
	const { data: session, status } = useSession();
	const router: AppRouterInstance = useRouter();

	// STATE FOR CATEGORY
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

	// STATE FOR SEARCH RESULT
	const [searchBarang, setSearchBarang] = useState<
		| {
				kategori: string;
				id: number[];
		  }
		| undefined
	>();

	// STATE FOR CART / KERANJANG
	const [barangKeranjang, setBarangKeranjang] = useState<Map<
		number,
		FoundBarang
	> | null>();
	//==========================
	/// END OF STATES ///

	// STATE HANDLERS / LIFECYCLES //
	// AMBIL BARANG AWAL DARI KERANJANG
	//===================================
	useEffect(() => {
		setBarangKeranjang(getBarangKeranjang());
	}, []);

	// AMBIL HASIL PERCARIAN (NON EVENT)
	useEffect(() => { 
		const params: URLSearchParams = new URLSearchParams(window.location.search);

		const kategori: string | null = params.get("cat");
		const barangParam: string | null = params.get("barang");

		if (barangParam == null || kategori == null) return;

		setSearchBarang({
			kategori: kategori,
			id: barangParam?.split(",").map((id: string) => Number(id)),
		});
	}, [])

	// EVENT
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

	// NANGKEP EVENT DAN MENGAMBIL HASIL SEARCH DARI URL PARAMETER
	useEffect(() => {
		window.addEventListener("PencarianBarangDitemukan", () => {
			const params: URLSearchParams = new URLSearchParams(
				window.location.search
			);

			const kategori: string | null = params.get("cat");
			const barangParam: string | null = params.get("barang");

			if (barangParam == null || kategori == null) return;

			setSearchBarang({
				kategori: kategori,
				id: barangParam?.split(",").map((id: string) => Number(id)),
			});
		});
	}, []);

	// NANGKEP EVENT DAN RESET PENCARIAN DAN BARANG HASIL PENCARIAN
	useEffect(() => {
		window.addEventListener("resetPencarian", () => {
			setSearchBarang(undefined);
		});
	}, []);
	//===============================================

	// ACCOUNT CHECKER
	//======================
	// NGECEK STATUS AKUN PENGGUNA
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/signin?callbackUrl=/daftarBarang");
		}
	}, [status, router]);

	// LOADING PAS LAGI NGECEK
	if (status === "loading") {
		return loading_circle();
	}
	//=======================
	// END OF STATE HANDLERS //

	// HANLDERS //
	// CATEGORY
	//=======================
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
	//==========================
	// END OF HANDLERS //

	return (
		<>
			{/* NAVBAR */}
			<MainNavbar />

			{/* MAIN CONTENT */}
			<div className='flex flex-col py-20'>
				{/* DAFTAR BARANG */}
				<div className='flex flex-wrap shrink-0 gap-10 justify-center'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
						{/* KALAU ADA HASIL PENCARIAN, PRIORITASKAN TAMPILKAN ITU */}
						{searchBarang?.id && searchBarang.id.length > 0
							? searchBarang.id.map((id) => {
									const barangList: FoundBarang[] | undefined =
										MappedDataBarang.get(searchBarang.kategori);
									const barang: FoundBarang | undefined = barangList?.[id];

									if (!barang) return null; // skip kalau undefined

									return (
										<div key={barang.id}>
											<CardViews
												item={barang}
												itemFromCart={barangKeranjang?.get(barang.id)}
											/>
										</div>
									);
							  })
							: /* KALAU TIDAK ADA PENCARIAN, RENDER SEMUA BARANG ATAU FILTER KATEGORI */
							  DataBarang.map((item) => {
									// kalau kategori nggak dipilih, tampilkan semua
									if (selectedCategory.length === 0) {
										return (
											<div key={item.id}>
												<CardViews
													item={item}
													itemFromCart={barangKeranjang?.get(item.id)}
												/>
											</div>
										);
									}

									// kalau kategori dipilih, tampilkan yang match
									if (selectedCategory.includes(item.kategori)) {
										return (
											<div key={item.id}>
												<CardViews
													item={item}
													itemFromCart={barangKeranjang?.get(item.id)}
												/>
											</div>
										);
									}

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
