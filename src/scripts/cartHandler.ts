// IMPORT MILIK SENDIRI //
// IMPORT TYPES
//==========================
import { DataBarangType, FoundBarang } from '@/types/global';
//==========================

// IMPORT FUNCTIONS
//==========================
import { B_Search } from './Binary-Search';
import { insertBarangEvent } from '@/lib/LocalStorageEvent';
//==========================

// IMPORT COMPONENTS/FUNCTION
//==========================
import notification from '@/components/notification';
//==========================

export const handle_RemoveFromCart = (nameItem: string): boolean => {
  try {
    var barang: DataBarangType[] = JSON.parse(localStorage.getItem('cart') ?? '[]');
    barang = barang.sort((a, b) => a.nama.toLowerCase().localeCompare(b.nama.toLowerCase()));

    const hasil: FoundBarang[] | null = B_Search(barang, nameItem);

    if (hasil === null) return false;
    hasil.forEach((item) => {
      if (item?.index == null) return;
      barang.splice(item.index, 1);
    });

    localStorage.setItem('cart', JSON.stringify(barang));
    insertBarangEvent('cart', barang);
    notification({ pesan: 'Barang berhasil dihapus dari keranjang', ok: true });
    return true;
  } catch (error) {
    notification({
      pesan: 'Terjadi kesalahan pas lagi mau ngebuang',
      deskripsi: error,
      ok: false,
    });
    throw new Error('error nih');
  }
};

export const getBarangKeranjang = (): Map<number, FoundBarang> | null => {
  if (typeof window === 'undefined') return null;

  const barangKeranjang: FoundBarang[] | null = JSON.parse(localStorage.getItem('cart') ?? '[]');

  if (barangKeranjang === null) {
    return null;
  }

  return new Map(barangKeranjang?.map((barang: FoundBarang) => [barang.id, barang]));
};

export const handle_AddToCart = (item: DataBarangType): void => {
  try {
    var barang: FoundBarang[] = JSON.parse(localStorage.getItem('cart') ?? '[]');

    barang.push({ ...item, addedToCart: true });

    localStorage.setItem('cart', JSON.stringify(barang));
    insertBarangEvent('cart', barang);
    notification({
      pesan: 'Barang berhasil ditambahkan ke keranjang',
      ok: true,
    });
  } catch (error) {
    notification({
      pesan: 'Gagal nyimpen barang ke keranjang :(',
      deskripsi: error,
      ok: false,
    });
    console.log('gagal menyimpan barang', error);
  }
};
