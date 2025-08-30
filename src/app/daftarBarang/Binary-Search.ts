import type { DataBarangType } from "@/types/global";

function count_mid(low: number, high: number): number {
    return Math.floor((low + high) / 2);
}

export function B_Search(daftarBarang: DataBarangType[], input: string) {
    const lowerInput: string = input.toLowerCase();
    const inputLength: number = lowerInput.length;

    let low: number = 0;
    let high: number = daftarBarang.length - 1;
    let middle: number = count_mid(low, high);
    let isFound: boolean = false;

    let itemFounded: DataBarangType[] = [];

    while (low <= high) {
        const hasil: number = lowerInput.localeCompare(daftarBarang[middle].nama.slice(0, inputLength).toLowerCase());
        
        if (hasil === 0) {
            itemFounded.push(daftarBarang[middle]);
            middle += 1;
            isFound = true;
            continue;
        } else if (hasil > 0) {
            low = middle + 1;
        } else {
            high = middle - 1;
        }

        if (isFound) return itemFounded;
        middle = count_mid(low, high);
    }

    return null;
}