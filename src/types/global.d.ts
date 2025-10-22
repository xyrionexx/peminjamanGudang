export interface DataBarangType {
  id: number;
  gambar?: StaticImageData | string;
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

export interface StatusConfig {
  label: string;
  icon: typeof Loader;
  bgColor: string;
  borderColor: string;
  titleColor: string;
  descColor: string;
}

export interface ItemBelanjaan {
  id: number;
  nama: string;
  desc: string;
  quantity: number;
  gambar: string;
  kategori: string;
}

export type FoundBarang = DataBarangType & { index?: number; addedToCart?: boolean };
