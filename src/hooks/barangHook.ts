import { getAllBarang } from "@/data/barangApi";
import { DataBarangType, FoundBarang } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type DataBarangBackend = {
	id_barang: number;
	nama_barang: string;
	jumlah: number;
	kategori: string;
	deskripsi: string;
	img?: string;
};

export function useBarang() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["daftarBarang"],
		queryFn: getAllBarang,
	});

	const dataBarang: DataBarangType[] = useMemo(() => {
		if (!data || !Array.isArray(data)) return [];
		return data.map((barang: DataBarangBackend) => ({
			id: barang.id_barang,
			nama: barang.nama_barang,
			desc: barang.deskripsi,
			stok: barang.jumlah,
			kategori: barang.kategori,
			gambar: barang.img,
		}));
	}, [data]);

	const mappedDataBarang: Map<string, FoundBarang[]> = useMemo(() => {
		const map = new Map<string, FoundBarang[]>();

		for (const item of dataBarang) {
			const key = item.nama[0].toLowerCase();
			const existing = map.get(key) || [];
			existing.push(item);
			existing.sort((a, b) => a.nama.localeCompare(b.nama));
			map.set(key, existing);
		}

		return map;
    }, [dataBarang]);
    
	return {
		dataBarang,
        mappedDataBarang,
        isLoading,
        error
    }
}
