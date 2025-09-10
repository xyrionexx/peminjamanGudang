import { FoundBarang } from "@/types/global";

export function insertBarangEvent(key: string, value: FoundBarang[]) {
	window.dispatchEvent(
		new CustomEvent("cartUpdate", {
			detail: {
				key: key,
				newValue: value,
			},
		})
	);
}
