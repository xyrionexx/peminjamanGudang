// TOOLS
import { JSX, useState } from "react";

// SHADCN
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

// ICON
import { Icon } from "@iconify/react/dist/iconify.js";

// MILIK SENDIRI
import { EnhancedSearch } from "./search";
import { DataBarangType, FoundBarang } from "@/types/global";
import ItemCard from "./ItemCard";
import { B_Search } from "@/scripts/Binary-Search";

export default function CartSidebarBtn(): JSX.Element {
	// HOOKS
	const [barang, setBarang] = useState<FoundBarang[] | null>(null);
	const [BarangFound, setBarangFound] = useState<FoundBarang[] | null>(null);

	// HANDLERS
	const getBarangCart = () => {
		try {
			const item: FoundBarang[] | null = JSON.parse(
				localStorage.getItem("cart") ?? "[]"
			);

			if (item === null) return;
			item.sort((a, b) => {
				return a.nama.toLowerCase().localeCompare(b.nama.toLowerCase());
			});
			setBarang(item);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearch = (searchvalue: string): void => {
		const result: FoundBarang[] | null = B_Search(
			barang as DataBarangType[],
			searchvalue
		);

		if (result === null) return;
		setBarangFound(result);
	};

	const handleReset = () => {
		setBarangFound(null);
	};

	return (
		<Sheet>
			{/* TRIGGER BUTTON */}
			<Tooltip>
				<TooltipTrigger
					asChild
					className='cursor-pointer'
					onMouseEnter={getBarangCart}>
					<SheetTrigger asChild>
						<Icon
							icon='vaadin:cart-o'
							width='20'
							height='20'
							className='cursor-pointer'
						/>
					</SheetTrigger>
				</TooltipTrigger>

				<TooltipContent>
					<p>Daftar belanjaan kamu ada disini nih...</p>
				</TooltipContent>
			</Tooltip>

			{/* SIDE RIGHT BAR  / SHEET CONTENT */}
			<SheetContent className='flex flex-col h-full'>
				<SheetHeader className='shrink-0'>
					<SheetTitle className='text-green-500 text-2xl flex items-center gap-2'>
						Keranjang
						<Icon
							icon='vaadin:cart-o'
							width='25'
							height='25'
						/>
					</SheetTitle>
					<SheetDescription>Daftar belanjaan kamu nih...</SheetDescription>
				</SheetHeader>

				{/* CONTENT */}
				<div className='flex-1 min-h-0 flex mx-2 flex-col gap-5'>
					{/* search */}
					<div className='shrink-0'>
						<EnhancedSearch
							onSearch={handleSearch}
							onReset={handleReset}
						/>
					</div>

					{/* ITEM */}
					<div
						className={`flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto pb-5 ${
							barang?.length === 0 ? "justify-center items-center" : ""
						}`}>
						{(BarangFound ?? []).length > 0 ? (
							// NGERENDER HASIL PENCARIAN BARANG
							BarangFound!.map((item) => {
								return (
									<div key={item.id}>
										<ItemCard
											barang={item}
											getBarang={getBarangCart}
										/>
									</div>
								);
							})
						) : barang?.length === 0 ? (
							// KALO BARANGNYA KOSONG YANG NAMPILIN INI
							<span className='text-gray-400'>
								Keranjang kamu kosong nih...
							</span>
						) : (
							// NAMPILIN SELURUH BARANG YANG ADA DI KERANJANG
							barang?.map((item) => {
								return (
									<div key={item.id}>
										<ItemCard
											barang={item}
											getBarang={getBarangCart}
										/>
									</div>
								);
							})
						)}
					</div>
				</div>

				<SheetFooter className='shrink-0'>
					<Button className='bg-green-500'>Order sekarang</Button>
					<SheetClose asChild>
						<Button variant={"outline"}>
							Nanti dulu, mau nyari yang lain dulu
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
