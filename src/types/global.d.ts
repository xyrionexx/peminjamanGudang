export interface DataBarangType {
	id: number;
	gambar: StaticImageData;
	nama: string;
	desc: string;
	stok: number;
	kategori: string;
}

export interface BarangTransaksiType {
	id: number;
	nama_barang: string;
	jumlah: number;
	kategori: string;
}

export type FoundBarang = DataBarangType & { index: number };
