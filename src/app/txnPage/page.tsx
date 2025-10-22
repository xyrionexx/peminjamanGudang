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
  // STATE MANAGEMENT
  // ========================================

  const [apakahBarcodeSudahDibuat, setApakahBarcodeSudahDibuat] = useState<boolean>(false);
  const [statusTransaksi, setStatusTransaksi] = useState<StatusTransaksi>('sedang-transaksi');
  const [daftarBelanjaan, setDaftarBelanjaan] = useState<ItemBelanjaan[] | undefined>(undefined);
  const isRestoring = useIsRestoring();

  useEffect(() => {
    if (isRestoring) return;
    const data = queryClient.getQueryData(['checkoutItem']);
    setDaftarBelanjaan(
      data == null ? [] : Array.isArray(data) ? data : [data]
    );
  }, [isRestoring]);

  // ========================================
  // EVENT HANDLERS
  // ========================================

  /**
   * Handler untuk request barcode dari server
   */
  const handleMintaBarcode = () => {
    console.log('Request barcode ke server');
    // TODO: Implement API call to generate barcode
    setApakahBarcodeSudahDibuat(true);
  };

  /**
   * Handler untuk menghapus item dari daftar belanjaan
   */
  const handleHapusBarang = (itemId: number) => {
    queryClient.removeQueries({queryKey: ['checkoutItem'], exact: true});
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
            />

            {/* Information Box */}
            <InfoBox />
          </div>
        </div>
      </div>
    </div>
  );
}
