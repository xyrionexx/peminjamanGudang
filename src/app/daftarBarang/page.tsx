'use client';

// TOOLS REACT / NEXT
//==========================
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
//==========================

// SHADCN
//==========================
import * as Pagination from '@/components/ui/pagination';
//==========================

// IMPORT MILIK SENDIRI / KITA
//==========================
import { getBarangKeranjang } from '@/scripts/cartHandler';
import CardViews from '@/components/CardViews';
import { Loading_circle } from '@/components/Loading';
import type { FoundBarang } from '@/types/global';
import Footer from '@/components/footer';
import MainNavbar from '@/components/NavbarMain';
import { useBarang } from '@/hooks/barangHook';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { useUsrck } from '@/hooks/usrck-hk';
//==========================

// TYPES
type cartEventTypes = {
  key: string;
  newValue: FoundBarang[];
};

export default function DaftarBarang() {
  /////////////////////////////////////////////
  // ========== STATE INITIALIZATION ==========
  /////////////////////////////////////////////

  // Barang-related state (data barang, session, router)
  const { dataBarang, mappedDataBarang, isLoading, error } = useBarang();
  const { data: session } = useSession();
  const { isLoading: userLoading, isValidUser } = useUsrck(session?.user?.accessToken || '');
  const router: AppRouterInstance = useRouter();

  // Category state
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [category, setCategory] = useState<{ name: string; status: boolean }[]>([
    { name: 'Audio', status: false },
    { name: 'Elektronik', status: false },
    { name: 'Komputer', status: false },
    { name: 'Aksesoris', status: false },
    { name: 'Peralatan', status: false },
    { name: 'Sound', status: false },
    { name: 'Fotografi', status: false },
  ]);

  // Search result state
  const [searchBarang, setSearchBarang] = useState<
    | {
        kategori: string;
        id: number[];
      }
    | undefined
  >();

  // Cart / Keranjang state
  const [barangKeranjang, setBarangKeranjang] = useState<Map<number, FoundBarang> | null>();

  /////////////////////////////////////////////
  // ========== EFFECTS / LIFECYCLES ==========
  /////////////////////////////////////////////

  // Ambil data keranjang awal dari local storage
  useEffect(() => {
    setBarangKeranjang(getBarangKeranjang());
  }, []);

  // Ambil hasil pencarian dari URL saat pertama kali load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kategori = params.get('cat');
    const barangParam = params.get('barang');

    if (!kategori || !barangParam) return;

    setSearchBarang({
      kategori,
      id: barangParam.split(',').map((id) => Number(id)),
    });
  }, []);

  // Event listener: update keranjang ketika event 'cartUpdate' terjadi
  useEffect(() => {
    const handleCartUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<cartEventTypes>;
      if (customEvent.detail.key === 'cart') {
        setBarangKeranjang(
          new Map(customEvent.detail.newValue.map((barang: FoundBarang) => [barang.id, barang]))
        );
      }
    };

    window.addEventListener('cartUpdate', handleCartUpdate);
    return () => window.removeEventListener('cartUpdate', handleCartUpdate);
  }, []);

  // Event listener: ambil hasil pencarian baru dari URL (event 'PencarianBarangDitemukan')
  useEffect(() => {
    const handlePencarian = () => {
      const params = new URLSearchParams(window.location.search);
      const kategori = params.get('cat');
      const barangParam = params.get('barang');

      if (!kategori || !barangParam) return;

      setSearchBarang({
        kategori,
        id: barangParam.split(',').map((id) => Number(id)),
      });
    };

    window.addEventListener('PencarianBarangDitemukan', handlePencarian);
    return () => window.removeEventListener('PencarianBarangDitemukan', handlePencarian);
  }, []);

  // Event listener: reset hasil pencarian (event 'resetPencarian')
  useEffect(() => {
    const handleReset = () => setSearchBarang(undefined);
    window.addEventListener('resetPencarian', handleReset);
    return () => window.removeEventListener('resetPencarian', handleReset);
  }, []);

  // Redirect ke /login jika status user tidak valid
  useEffect(() => {
    if (isLoading) return;
    if (isValidUser) return;
    router.replace(`/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
  }, [router, isValidUser, isLoading]);

  /////////////////////////////////////////////
  // ============= EVENT HANDLERS =============
  /////////////////////////////////////////////

  // Toggle kategori (aktif/nonaktif)
  const handleCategory = (categoryItem: { name: string; status: boolean }) => {
    if (selectedCategory.includes(categoryItem.name)) {
      setSelectedCategory((prev) => prev.filter((item) => item !== categoryItem.name));
    } else {
      setSelectedCategory((prev) => [...prev, categoryItem.name]);
    }
    categoryItem.status = !categoryItem.status;
  };

  // Clear semua kategori yang dipilih
  const handleClearAll = (): void => {
    setSelectedCategory([]);
    category.forEach((item) => (item.status = false));
  };

  if (userLoading) {
    return <Loading_circle />;
  }

  return (
    <>
      {/* NAVBAR */}
      <MainNavbar />

      {/* MAIN CONTENT */}
      <div className="flex flex-col py-20">
        {/* DAFTAR BARANG */}
        <div className="flex flex-wrap shrink-0 gap-10 justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {error && <ErrorDisplay />}

            {isLoading && <Loading_circle />}

            {/* KALAU ADA HASIL PENCARIAN, PRIORITASKAN TAMPILKAN ITU */}
            {!isLoading && searchBarang?.id && searchBarang.id.length > 0
              ? searchBarang.id.map((id) => {
                  const barangList: FoundBarang[] | undefined = mappedDataBarang.get(
                    searchBarang.kategori
                  );
                  const barang: FoundBarang | undefined = barangList?.[id];

                  if (!barang) return null; // skip kalau undefined

                  return (
                    <div key={barang.id}>
                      <CardViews item={barang} itemFromCart={barangKeranjang?.get(barang.id)} />
                    </div>
                  );
                })
              : /* KALAU TIDAK ADA PENCARIAN, RENDER SEMUA BARANG ATAU FILTER KATEGORI */
                (dataBarang as FoundBarang[]).map((item: FoundBarang) => {
                  // kalau kategori nggak dipilih, tampilkan semua
                  if (selectedCategory.length === 0) {
                    return (
                      <div key={item.id}>
                        <CardViews item={item} itemFromCart={barangKeranjang?.get(item.id)} />
                      </div>
                    );
                  }

                  // kalau kategori dipilih, tampilkan yang match
                  if (selectedCategory.includes(item.kategori)) {
                    return (
                      <div key={item.id}>
                        <CardViews item={item} itemFromCart={barangKeranjang?.get(item.id)} />
                      </div>
                    );
                  }

                  return null;
                })}
          </div>
        </div>

        {/* PAGINATION */}
        <div className="mt-10">
          <Pagination.Pagination>
            <Pagination.PaginationContent>
              {/* PREVIOUS PAGE */}
              <Pagination.PaginationItem>
                <Pagination.PaginationPrevious href="#" />
              </Pagination.PaginationItem>

              {/* NUMBER SELECTION OF PAGES */}
              <Pagination.PaginationItem>
                <Pagination.PaginationLink href="#" isActive>
                  1
                </Pagination.PaginationLink>
              </Pagination.PaginationItem>
              <Pagination.PaginationItem>
                <Pagination.PaginationLink href="#">2</Pagination.PaginationLink>
              </Pagination.PaginationItem>
              <Pagination.PaginationItem>
                <Pagination.PaginationLink href="#">3</Pagination.PaginationLink>
              </Pagination.PaginationItem>

              {/* TITIK-TITIK */}
              <Pagination.PaginationItem>
                <Pagination.PaginationEllipsis />
              </Pagination.PaginationItem>

              {/* NEXT PAGE */}
              <Pagination.PaginationItem>
                <Pagination.PaginationNext href="#" />
              </Pagination.PaginationItem>
            </Pagination.PaginationContent>
          </Pagination.Pagination>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
