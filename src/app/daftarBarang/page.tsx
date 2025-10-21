// ============================================================================
// CLIENT COMPONENT DIRECTIVE
// ============================================================================
// Menandakan ini adalah Client Component di Next.js App Router
// Diperlukan karena menggunakan hooks dan browser APIs
'use client';

// ============================================================================
// EXTERNAL LIBRARIES - REACT / NEXT.JS
// ============================================================================
// Hooks dan utilities untuk autentikasi, routing, dan state management
import { useSession } from 'next-auth/react'; // Session management dengan NextAuth
import { useRouter } from 'next/navigation'; // Router untuk navigasi programmatic
import { useEffect, useState } from 'react'; // React hooks untuk lifecycle dan state
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'; // Type untuk router

// ============================================================================
// UI COMPONENTS - SHADCN
// ============================================================================
// Komponen pagination dari shadcn/ui library
import * as Pagination from '@/components/ui/pagination';

// ============================================================================
// CUSTOM IMPORTS - COMPONENTS, HOOKS, TYPES, UTILITIES
// ============================================================================
// Utilities dan handlers
import { getBarangKeranjang } from '@/scripts/cartHandler'; // Function untuk ambil data keranjang dari localStorage

// Components
import CardViews from '@/components/CardViews'; // Card component untuk display barang
import { Loading_circle } from '@/components/Loading'; // Loading spinner component
import Footer from '@/components/footer'; // Footer component
import MainNavbar from '@/components/NavbarMain'; // Navbar component
import { ErrorDisplay } from '@/components/ErrorDisplay'; // Error display component

// Custom Hooks
import { useBarang } from '@/hooks/barangHook'; // Hook untuk fetch dan manage data barang
import { useUsrck } from '@/hooks/usrck-hk'; // Hook untuk validasi user dan token refresh

// Types
import type { FoundBarang } from '@/types/global'; // Type definition untuk data barang

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Type untuk custom event cartUpdate
 * Digunakan untuk sync state keranjang antar components
 */
type cartEventTypes = {
  key: string; // Identifier untuk event (harus 'cart')
  newValue: FoundBarang[]; // Array barang baru di keranjang
};

// ============================================================================
// MAIN COMPONENT: DaftarBarang
// ============================================================================

/**
 * Component halaman daftar barang dengan fitur:
 * - Display semua barang dari API
 * - Filter barang berdasarkan kategori
 * - Search/pencarian barang dari navbar
 * - Integrasi dengan keranjang belanja
 * - Protected route (harus login)
 * - Pagination (UI only, belum functional)
 */
export default function DaftarBarang() {
  // ==========================================================================
  // HOOKS & DATA FETCHING
  // ==========================================================================

  /**
   * useBarang: Custom hook untuk fetch data barang dari API
   * Returns:
   * - dataBarang: Array semua barang (flat)
   * - mappedDataBarang: Map dengan key kategori, value array barang
   * - isLoading: Loading state saat fetch
   * - error: Error object jika fetch gagal
   */
  const { dataBarang, mappedDataBarang, isLoading, error } = useBarang();

  /**
   * useSession: Hook NextAuth untuk get session data
   * Returns session object yang berisi user info dan tokens
   */
  const { data: session, status } = useSession();

  /**
   * useUsrck: Custom hook untuk validasi user dan auto token refresh
   * Returns:
   * - userLoading: Loading state saat validasi user
   * - isValidUser: Boolean apakah user valid/terautentikasi
   */
  const { isLoading: userLoading, isValidUser } = useUsrck(session?.user?.accessToken || '');

  /**
   * useRouter: Next.js router untuk navigasi programmatic
   */
  const router: AppRouterInstance = useRouter();

  // ==========================================================================
  // STATE MANAGEMENT - CATEGORY FILTER
  // ==========================================================================

  /**
   * State: Array nama kategori yang sedang dipilih/aktif
   * Contoh: ['Audio', 'Elektronik']
   */
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  /**
   * State: Master list semua kategori dengan status aktif/nonaktif
   * Digunakan untuk rendering checkbox/button kategori
   */
  const [category, setCategory] = useState<{ name: string; status: boolean }[]>([
    { name: 'Audio', status: false },
    { name: 'Elektronik', status: false },
    { name: 'Komputer', status: false },
    { name: 'Aksesoris', status: false },
    { name: 'Peralatan', status: false },
    { name: 'Sound', status: false },
    { name: 'Fotografi', status: false },
  ]);

  // ==========================================================================
  // STATE MANAGEMENT - SEARCH RESULT
  // ==========================================================================

  /**
   * State: Hasil pencarian barang dari navbar
   * Structure:
   * - kategori: Kategori barang yang dicari
   * - id: Array index barang di dalam mappedDataBarang
   *
   * Ketika ada searchBarang, hasil pencarian akan ditampilkan
   * prioritas daripada daftar barang biasa
   */
  const [searchBarang, setSearchBarang] = useState<
    | {
        kategori: string;
        id: number[];
      }
    | undefined
  >();

  // ==========================================================================
  // STATE MANAGEMENT - SHOPPING CART
  // ==========================================================================

  /**
   * State: Map barang yang ada di keranjang
   * Key: ID barang
   * Value: Object FoundBarang lengkap
   *
   * Menggunakan Map untuk O(1) lookup saat check apakah barang di cart
   */
  const [barangKeranjang, setBarangKeranjang] = useState<Map<number, FoundBarang> | null>();

  // ==========================================================================
  // EFFECT 1: INITIALIZE CART DATA
  // ==========================================================================

  /**
   * Effect: Load data keranjang dari localStorage saat component mount
   * Hanya run sekali di awal (dependency array kosong)
   */
  useEffect(() => {
    setBarangKeranjang(getBarangKeranjang());
  }, []);

  // ==========================================================================
  // EFFECT 2: PARSE SEARCH PARAMS FROM URL (INITIAL LOAD)
  // ==========================================================================

  /**
   * Effect: Parse URL search params saat halaman pertama kali load
   *
   * URL Format: ?cat=Elektronik&barang=0,1,2
   * - cat: Kategori barang
   * - barang: Comma-separated index barang
   *
   * Jika ada params, set ke state searchBarang untuk tampilkan hasil
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kategori = params.get('cat');
    const barangParam = params.get('barang');

    // Skip jika salah satu params tidak ada
    if (!kategori || !barangParam) return;

    // Parse string "0,1,2" menjadi array numbers [0, 1, 2]
    setSearchBarang({
      kategori,
      id: barangParam.split(',').map((id) => Number(id)),
    });
  }, []);

  // ==========================================================================
  // EFFECT 3: LISTEN TO CART UPDATE EVENT
  // ==========================================================================

  /**
   * Effect: Event listener untuk sync keranjang antar components
   *
   * Event 'cartUpdate' di-trigger dari components lain (misal: CardViews)
   * ketika user add/remove barang dari keranjang
   *
   * Event ini memastikan UI keranjang selalu up-to-date
   */
  useEffect(() => {
    const handleCartUpdate = (event: Event) => {
      // Cast ke CustomEvent untuk akses detail
      const customEvent = event as CustomEvent<cartEventTypes>;

      // Validasi key event
      if (customEvent.detail.key === 'cart') {
        // Convert array ke Map untuk efficient lookup
        setBarangKeranjang(
          new Map(customEvent.detail.newValue.map((barang: FoundBarang) => [barang.id, barang]))
        );
      }
    };

    // Register event listener
    window.addEventListener('cartUpdate', handleCartUpdate);

    // Cleanup: remove listener saat unmount
    return () => window.removeEventListener('cartUpdate', handleCartUpdate);
  }, []);

  // ==========================================================================
  // EFFECT 4: LISTEN TO SEARCH RESULT EVENT
  // ==========================================================================

  /**
   * Effect: Event listener untuk hasil pencarian baru dari navbar
   *
   * Event 'PencarianBarangDitemukan' di-trigger dari NavbarMain
   * setelah user search dan barang ditemukan
   *
   * Effect ini akan parse URL params dan update searchBarang state
   */
  useEffect(() => {
    const handlePencarian = () => {
      const params = new URLSearchParams(window.location.search);
      const kategori = params.get('cat');
      const barangParam = params.get('barang');

      // Skip jika params tidak lengkap
      if (!kategori || !barangParam) return;

      // Update state dengan hasil pencarian baru
      setSearchBarang({
        kategori,
        id: barangParam.split(',').map((id) => Number(id)),
      });
    };

    // Register event listener
    window.addEventListener('PencarianBarangDitemukan', handlePencarian);

    // Cleanup: remove listener saat unmount
    return () => window.removeEventListener('PencarianBarangDitemukan', handlePencarian);
  }, []);

  // ==========================================================================
  // EFFECT 5: LISTEN TO SEARCH RESET EVENT
  // ==========================================================================

  /**
   * Effect: Event listener untuk reset hasil pencarian
   *
   * Event 'resetPencarian' di-trigger ketika:
   * - User clear search input
   * - User klik logo/home untuk kembali ke daftar barang
   *
   * Effect ini akan reset searchBarang ke undefined,
   * sehingga tampilan kembali ke daftar barang normal
   */
  useEffect(() => {
    const handleReset = () => setSearchBarang(undefined);

    // Register event listener
    window.addEventListener('resetPencarian', handleReset);

    // Cleanup: remove listener saat unmount
    return () => window.removeEventListener('resetPencarian', handleReset);
  }, []);

  // ==========================================================================
  // EFFECT 6: AUTHENTICATION GUARD (PROTECTED ROUTE)
  // ==========================================================================

  /**
   * Effect: Redirect ke halaman login jika user tidak valid
   *
   * Flow:
   * 1. Tunggu session dan user validation selesai
   * 2. Jika user tidak valid, redirect ke /signin
   * 3. Simpan current URL di callbackUrl untuk redirect balik setelah login
   *
   * Guards:
   * - Skip jika session masih undefined (belum loaded)
   * - Skip jika userLoading masih true (masih validasi)
   * - Skip jika isValidUser true (user valid)
   */
  useEffect(() => {
    // User tidak valid, redirect ke login dengan callback URL
    if (status === 'unauthenticated' && session == undefined) {
      router.replace(`/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
    }
    if (!userLoading && session && !isValidUser) {
      router.replace(`/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
    }
  }, [session, isValidUser, userLoading, router, status]);

  // ==========================================================================
  // EVENT HANDLERS - CATEGORY FILTER
  // ==========================================================================

  /**
   * Handler: Toggle status kategori (aktif/nonaktif)
   *
   * Logic:
   * - Jika kategori sudah aktif, remove dari selectedCategory
   * - Jika kategori nonaktif, tambahkan ke selectedCategory
   * - Update status boolean pada category array
   *
   * @param categoryItem - Object kategori yang di-click
   */
  const handleCategory = (categoryItem: { name: string; status: boolean }) => {
    // Check apakah kategori sudah dipilih
    if (selectedCategory.includes(categoryItem.name)) {
      // Remove dari selected
      setSelectedCategory((prev) => prev.filter((item) => item !== categoryItem.name));
    } else {
      // Tambahkan ke selected
      setSelectedCategory((prev) => [...prev, categoryItem.name]);
    }

    // Toggle status boolean
    categoryItem.status = !categoryItem.status;
  };

  /**
   * Handler: Clear semua filter kategori
   *
   * Logic:
   * - Reset selectedCategory ke array kosong
   * - Set semua status kategori ke false
   */
  const handleClearAll = (): void => {
    setSelectedCategory([]);
    category.forEach((item) => (item.status = false));
  };

  // ==========================================================================
  // RENDER COMPONENT
  // ==========================================================================

  return (
    <>
      {/* ===== NAVIGATION BAR ===== */}
      <MainNavbar />

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div className="flex flex-col py-20 mt-8">
        {/* ===== SECTION: DAFTAR BARANG ===== */}
        <div className="flex flex-wrap shrink-0 gap-10 justify-center">
          {/* Grid Layout untuk Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {/* ----- ERROR STATE ----- */}
            {error && <ErrorDisplay />}

            {/* ----- LOADING STATE ----- */}
            {isLoading && <Loading_circle />}

            {/* ----- CONDITIONAL RENDERING: SEARCH VS NORMAL LIST ----- */}

            {/* 
              SCENARIO 1: ADA HASIL PENCARIAN
              Tampilkan hanya barang hasil search, prioritas tertinggi
            */}
            {!isLoading && searchBarang?.id && searchBarang.id.length > 0
              ? searchBarang.id.map((id) => {
                  // Get array barang berdasarkan kategori dari Map
                  const barangList: FoundBarang[] | undefined = mappedDataBarang.get(
                    searchBarang.kategori
                  );

                  // Get barang spesifik berdasarkan index
                  const barang: FoundBarang | undefined = barangList?.[id];

                  // Skip jika barang tidak ditemukan
                  if (!barang) return null;

                  return (
                    <div key={barang.id}>
                      {/* Render card dengan data barang dan info cart */}
                      <CardViews item={barang} itemFromCart={barangKeranjang?.get(barang.id)} />
                    </div>
                  );
                })
              : /* 
                  SCENARIO 2: TIDAK ADA PENCARIAN
                  Tampilkan semua barang atau filter berdasarkan kategori
                */
                (dataBarang as FoundBarang[]).map((item: FoundBarang) => {
                  // Sub-scenario A: Tidak ada kategori dipilih
                  // Tampilkan SEMUA barang
                  if (selectedCategory.length === 0) {
                    return (
                      <div key={item.id}>
                        <CardViews item={item} itemFromCart={barangKeranjang?.get(item.id)} />
                      </div>
                    );
                  }

                  // Sub-scenario B: Ada kategori dipilih
                  // Tampilkan HANYA barang yang match dengan kategori yang dipilih
                  if (selectedCategory.includes(item.kategori)) {
                    return (
                      <div key={item.id}>
                        <CardViews item={item} itemFromCart={barangKeranjang?.get(item.id)} />
                      </div>
                    );
                  }

                  // Barang tidak match kategori, skip
                  return null;
                })}
          </div>
        </div>

        {/* ===== SECTION: PAGINATION ===== */}
        {/* 
          NOTE: Pagination ini masih UI only (static)
          Belum ada logic untuk navigate antar halaman
          TODO: Implement pagination logic dengan API
        */}
        <div className="mt-10">
          <Pagination.Pagination>
            <Pagination.PaginationContent>
              {/* ----- PREVIOUS BUTTON ----- */}
              <Pagination.PaginationItem>
                <Pagination.PaginationPrevious href="#" />
              </Pagination.PaginationItem>

              {/* ----- PAGE NUMBERS ----- */}
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

              {/* ----- ELLIPSIS (MORE PAGES) ----- */}
              <Pagination.PaginationItem>
                <Pagination.PaginationEllipsis />
              </Pagination.PaginationItem>

              {/* ----- NEXT BUTTON ----- */}
              <Pagination.PaginationItem>
                <Pagination.PaginationNext href="#" />
              </Pagination.PaginationItem>
            </Pagination.PaginationContent>
          </Pagination.Pagination>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <Footer />
    </>
  );
}
