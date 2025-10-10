import { DataBarangType, FoundBarang } from '@/types/global';

export default function SortMap(dataBarang: DataBarangType[]) {
  const map = new Map<string, FoundBarang[]>();

  for (const item of dataBarang) {
    const key = item.nama[0].toLowerCase();
    const existing = map.get(key) || [];
    existing.push(item);
    existing.sort((a, b) => a.nama.localeCompare(b.nama));
    map.set(key, existing);
  }

  return map;
}
