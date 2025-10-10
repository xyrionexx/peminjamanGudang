import type { DataBarangType } from '@/types/global';

export class Penyimpanan {
  daftarBarang: DataBarangType[];
  Rak_Penyimpanan: Penyimpanan[];
  rakPalingAkhir: boolean;

  constructor(rakPalingAkhir = true) {
    this.daftarBarang = [];
    this.Rak_Penyimpanan = [];
    this.rakPalingAkhir = rakPalingAkhir;
  }

  cari(penyimpanan: Penyimpanan, input: string): DataBarangType | null | undefined {
    let index = 0;

    while (
      index < penyimpanan.daftarBarang.length &&
      !penyimpanan.daftarBarang[index].nama.toLowerCase().startsWith(input.toLowerCase())
    ) {
      index += 1;
    }

    if (index < penyimpanan.daftarBarang.length) {
      return penyimpanan.daftarBarang[index];
    }

    if (penyimpanan.rakPalingAkhir) return null;
    // return this.cari(penyimpanan.daftarBarang[index], input)
  }
}
