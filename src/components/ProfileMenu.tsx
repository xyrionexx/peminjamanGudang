import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";

import { Icon } from "@iconify/react/dist/iconify.js";

export default function ProfileMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Icon
					icon='ep:arrow-down'
					width='20'
					height='20'
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				{/* HEADER / TITLE */}
				<DropdownMenuLabel className='font-bold'>
					Profile Menu
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{/* CONTENT */}
				<DropdownMenuGroup>
					{/* GENERAL SETTINGS */}
					<DropdownMenuItem>
						<Icon
							icon='bx:user'
							width='24'
							height='24'
						/>
						Profil
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon
							icon='gravity-ui:gear'
							width='16'
							height='16'
						/>
						Pengaturan
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					{/* RISKY SETTINGS */}
					<DropdownMenuItem>
						<Icon
							icon='meteor-icons:arrows-rotate'
							width='16'
							height='16'
						/>
						Pindah Akun
					</DropdownMenuItem>
					<DropdownMenuItem className='text-red-500'>
						<Icon
							icon='mingcute:exit-line'
							width='24'
							height='24'
							className='text-red-500'
						/>
						Keluar
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
