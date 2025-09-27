import { Button } from "@/components/ui/button";
import { DataBarangType, FoundBarang } from "@/types/global";
import { Icon } from "@iconify/react";
import { handle_RemoveFromCart } from "@/scripts/cartHandler";

type itemTypeProps = {
	barang: FoundBarang;
	getBarang: () => void;
}

export default function ItemCard(
	{barang, getBarang}: itemTypeProps
) {
	return (
		<div className='bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-500 transition-all duration-200 p-4'>
			<div className='flex items-center gap-4'>
				{/* Image */}
				<div className='flex-shrink-0'>
					<div className='w-16 h-16 rounded-lg overflow-hidden bg-gray-50 border border-gray-100'>
						<img
							src='https://picsum.photos/64'
							alt='Product image'
							className='w-full h-full object-cover'
						/>
					</div>
				</div>

				{/* Information */}
				<div className='flex-1 min-w-0'>
					<h3 className='font-semibold text-gray-900 text-base leading-tight mb-1 truncate'>
						{barang.nama}
					</h3>
					<p className='text-sm text-gray-500 leading-relaxed line-clamp-2'>
                        {barang.desc}
					</p>
				</div>

				{/* Actions */}
				<div className='flex items-center gap-3 flex-shrink-0'>
					{/* Delete Button */}
					<Button
						variant='ghost'
						size='icon'
						className='h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200'
						onClick={() => {
							handle_RemoveFromCart(barang.nama);
							getBarang();
						}}
					>
						<Icon
							icon='solar:trash-bin-2-line-duotone'
							width='20'
							height='20'
						/>
					</Button>

					{/* Quantity Controls */}
					<div className='flex items-center bg-gray-50 rounded-full border border-gray-200 p-1'>
						<Button
							variant='ghost'
							size='icon'
							className='h-8 w-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200'>
							<Icon
								icon='ic:baseline-minus'
								width='16'
								height='16'
							/>
						</Button>

						<span className='px-3 py-1 text-sm font-medium text-gray-900 min-w-[2rem] text-center'>
							2
						</span>

						<Button
							variant='ghost'
							size='icon'
							className='h-8 w-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200'>
							<Icon
								icon='ic:baseline-plus'
								width='16'
								height='16'
							/>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
