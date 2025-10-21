'use client';

import { StatusConfig } from '@/types/global';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  Clock,
  Loader,
} from 'lucide-react';;
import MainNavbar from '@/components/NavbarMain';
import { ShoppingListSection } from '@/components/ShoppingList';
import { StatusAlert } from '@/components/StatusAlert';
import { BarcodeSection } from '@/components/BarcodeSection';
import { InfoBox } from '@/components/InfoBox';

// ========================================
// TYPE DEFINITIONS
// ========================================

type StatusTransaksi =
  | 'sedang-transaksi'
  | 'transaksi-selesai'
  | 'sedang-meminjam'
  | 'peminjaman-selesai';

interface ItemBelanjaan {
  id: number;
  name: string;
  quantity: number;
  image: string;
  kategori: string;
}

// ========================================
// MAIN COMPONENT: TRANSACTION PAGE
// ========================================

export default function TransactionPage() {
  // ========================================
  // CONSTANTS
  // ========================================

  const MOCK_BELANJAAN: ItemBelanjaan[] = [
    {
      id: 1,
      name: 'Sony WH-1000XM5 Wireless Headphones',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100',
      kategori: 'Audio',
    },
    {
      id: 2,
      name: 'Canon EOS R6 Mark II Camera Body',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1606980227037-f2cb59211d61?w=100',
      kategori: 'Fotografi',
    },
    {
      id: 3,
      name: 'Logitech MX Master 3S Mouse',
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100',
      kategori: 'Komputer',
    },
  ];

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
  const [daftarBelanjaan, setDaftarBelanjaan] = useState<ItemBelanjaan[]>(MOCK_BELANJAAN);

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
    setDaftarBelanjaan((prev) => prev.filter((item) => item.id !== itemId));
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
