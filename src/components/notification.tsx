// SHADCN
//==========================
import { toast } from "sonner";
//==========================

// ICONS
//==========================
import { Icon } from "@iconify/react";
//==========================

// TYPES
//==========================
interface notifParamTypes {
	pesan: string;
	deskripsi?: unknown;
	ok: boolean;
}
//==========================

export default function notification({
	pesan,
	deskripsi,
	ok,
}: notifParamTypes) {
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
}
