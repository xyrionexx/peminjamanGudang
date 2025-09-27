import { DataBarang } from "@/app/daftarBarang/dummyData";
import { FoundBarang } from "@/types/global";

export default function SortMap(data: FoundBarang[]) {
	// kebutuhan data
	const alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
	const categorizedAlphabetItemName = new Map<string, FoundBarang[]>();

	// proses masukkan data ke map
	for (const item of data) {
		const key: string = item.nama[0].toLowerCase();
		let dataLama: FoundBarang[] | undefined = categorizedAlphabetItemName.get(key);
		if (dataLama == null) {
			categorizedAlphabetItemName.set(key, [item]);
		} else {
			dataLama.push(item); 
		}
	}

	const hasil_sorting = alphabet
		.filter((huruf: string) => categorizedAlphabetItemName.has(huruf))
		.map((huruf: string) => categorizedAlphabetItemName.get(huruf)!);

	return hasil_sorting;
}
