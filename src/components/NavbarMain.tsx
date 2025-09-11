// REACT
import { useSession } from "next-auth/react";

// SHADCN
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// IMPORT MILIK KITA SENDIRI
import ProfileMenu from "./ProfileMenu";
import { EnhancedSearch } from "./search";
import CartSidebarBtn from "./CartSidebarBtn";

export default function MainNavbar() {
	// HOOKS
	const { data: session, status } = useSession();

	// HANDLERS
	const handleSearch = (): void => {};

	const handleReset = (): void => {};

	return (
		<div className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md'>
			<div className='navbar flex items-center py-4 px-10 gap-5'>
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

				{/* SEARCH BAR */}
				<div className='flex flex-1'>
					<EnhancedSearch
						placeholder='Mangga cari barang disini'
						onSearch={handleSearch}
						onReset={handleReset}
					/>
				</div>

				{/* TOMBOL KERANGJANG SIDE RIGHT BAR */}
				<div>
					<CartSidebarBtn />
				</div>
			</div>
		</div>
	);
}
