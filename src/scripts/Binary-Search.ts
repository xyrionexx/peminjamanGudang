import type { DataBarangType } from '@/types/global';

function count_mid(low: number, high: number): number {
  return Math.floor((low + high) / 2);
}

export function B_Search(daftarBarang: DataBarangType[], input: string) {
  // USER INPUT
  const lowerInput: string = input.toLowerCase();
  const inputLength: number = lowerInput.length;

  // THE INDEX TRACKERS
  let low: number = 0;
  let high: number = daftarBarang.length - 1;
  let middle: number = count_mid(low, high); // MAIN TRACKER

  // STORE
  const itemFounded: DataBarangType[] = []; // TEMP DATA STORE
  const itemFoundedFix: (DataBarangType & { index?: number })[] = []; // MAIN DATA STORE

  while (low <= high) {
    // NGABANDINGIN USER INPUT DENGAN NILAI INDEX SAAT INI
    const hasil: number = lowerInput.localeCompare(
      daftarBarang[middle].nama.slice(0, inputLength).toLowerCase()
    );

    // KONDISI HASIL BILA KETEMU => hasil = 0
    if (hasil === 0) {
      if (middle > itemFounded.length) {
        itemFounded.length = middle;
      }

      if (!(middle in itemFounded)) {
        itemFounded[middle] = daftarBarang[middle];
        itemFoundedFix.push({
          ...daftarBarang[middle],
          index: middle,
        });
      }

      middle += 1;
      if (middle > high) return itemFoundedFix;
      continue;
    } else if (hasil > 0) {
      low = middle + 1;
    } else {
      high = middle - 1;
    }

    middle = count_mid(low, high);
  }

  return itemFoundedFix;
}
