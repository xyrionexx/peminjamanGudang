'use client';

import { StatusConfig } from '@/types/global';
import { useEffect, useState } from 'react';
import { ItemBelanjaan } from '@/types/global';
import { CheckCircle, Clock, Loader } from 'lucide-react';
import MainNavbar from '@/components/NavbarMain';
import { ShoppingListSection } from '@/components/ShoppingList';
import { StatusAlert } from '@/components/StatusAlert';
import { BarcodeSection } from '@/components/BarcodeSection';
import { InfoBox } from '@/components/InfoBox';
import { queryClient } from '@/config/queryClient';
import { useIsRestoring } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useUsrck } from '@/hooks/usrck-hk';
import { useRouter } from 'next/navigation';
import api from '@/config/axiosConfig';
import notification from '@/components/notification';

// ========================================
// TYPE DEFINITIONS
// ========================================

type StatusTransaksi =
  | 'sedang-transaksi'
  | 'transaksi-selesai'
  | 'sedang-meminjam'
  | 'peminjaman-selesai';

// ========================================
// MAIN COMPONENT: TRANSACTION PAGE
// ========================================

export default function TransactionPage() {
  // ========================================
  // CONSTANTS
  // ========================================

  const STATUS_CONFIGS: Record<StatusTransaksi, StatusConfig> = {
    'sedang-transaksi': {
      label: 'Sedang Transaksi',
      icon: Loader,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      titleColor: 'text-blue-900',
      descColor: 'text-blue-800',
    },
    'transaksi-selesai': {
      label: 'Transaksi Selesai',
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      titleColor: 'text-green-900',
      descColor: 'text-green-800',
    },
    'sedang-meminjam': {
      label: 'Sedang Meminjam',
      icon: Clock,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      titleColor: 'text-yellow-900',
      descColor: 'text-yellow-800',
    },
    'peminjaman-selesai': {
      label: 'Peminjaman Selesai',
      icon: CheckCircle,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      titleColor: 'text-purple-900',
      descColor: 'text-purple-800',
    },
  };

  // ========================================
  // AUTHENTICATION & USER VALIDATION
  // ========================================

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

  // ========================================
  // STATE MANAGEMENT
  // ========================================

  const [apakahBarcodeSudahDibuat, setApakahBarcodeSudahDibuat] = useState<boolean>(false);
  const [statusTransaksi, setStatusTransaksi] = useState<StatusTransaksi>('sedang-transaksi');
  const [daftarBelanjaan, setDaftarBelanjaan] = useState<ItemBelanjaan[] | undefined>(undefined);
  const [storeBarcode, setStoreBarcode] = useState<string>('');
  const isRestoring = useIsRestoring();

  const router = useRouter();

  // ========================================
  // EFFECTS 1: SYNC SHOPPING LIST FROM REACT QUERY CACHE
  // ========================================

  /**
   * Sinkronisasi state daftar belanjaan dengan data dari React Query cache
   * - Mengambil data dari cache key 'checkoutItem'
   * - Normalize data jadi array (handle null/single object)
   * - Skip saat proses restore sedang berjalan
   */
  useEffect(() => {
    // Skip sync saat restore untuk hindari race condition
    if (isRestoring) return;

    const data = queryClient.getQueryData(['checkoutItem']);

    // Normalize: null → [], single object → [object], array → array
    setDaftarBelanjaan(data == null ? [] : Array.isArray(data) ? data : [data]);
  }, [isRestoring]);

  // ==========================================================================
  // EFFECT 2: AUTHENTICATION GUARD (PROTECTED ROUTE)
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

  // ========================================
  // EVENT HANDLERS
  // ========================================

  /**
   * Handler untuk request barcode dari server
   */
  const handleMintaBarcode = async () => {
    try {
      const res = await api.post(
        '/qrtxncode/',
        {
          nama_barang: daftarBelanjaan?.[0].nama,
          jumlah: daftarBelanjaan?.[0].quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        setApakahBarcodeSudahDibuat(true);
        setStoreBarcode(res.data.qr_code);
      }
    } catch (error) {
      console.error(error);

      const errorMessage =
        (error instanceof Error && error.message) ||
        (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && ('message' in error.response.data || 'detail' in error.response.data)
          ? ('message' in error.response.data ? String(error.response.data.message) : 'detail' in error.response.data ? String(error.response.data.detail) : '')
          : '') ||
        'Terjadi kesalahan saat meminta barcode. Silakan coba lagi.';

      notification({
        pesan: 'Gagal membuat barcode',
        deskripsi: errorMessage,
        ok: false,
      });
    }
  };

  /**
   * Handler untuk menghapus item dari daftar belanjaan
   */
  const handleHapusBarang = (itemId: number) => {
    queryClient.removeQueries({ queryKey: ['checkoutItem'], exact: true });
    setDaftarBelanjaan((prev) => prev?.filter((item) => item.id !== itemId));
  };

  // ========================================
  // COMPUTED VALUES
  // ========================================

  const currentStatusConfig = STATUS_CONFIGS[statusTransaksi];

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <MainNavbar />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT/CENTER SECTION - Shopping List */}
          <div className="lg:col-span-2 space-y-4">
            <ShoppingListSection
              daftarBelanjaan={daftarBelanjaan}
              onDeleteItem={handleHapusBarang}
            />
          </div>

          {/* RIGHT SECTION - Barcode & Status */}
          <div className="lg:col-span-1 space-y-4">
            {/* Status Alert */}
            <StatusAlert statusConfig={currentStatusConfig} />

            {/* Barcode Section */}
            <BarcodeSection
              isBarcodeGenerated={apakahBarcodeSudahDibuat}
              onRequestBarcode={handleMintaBarcode}
              barcodeData={storeBarcode}
            />

            {/* Information Box */}
            <InfoBox />
          </div>
        </div>
      </div>
    </div>
  );
}
