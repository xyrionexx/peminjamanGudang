"use client"

import { useState } from "react"
import { ShoppingCart, Package, Home, QrCode, AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function TransactionPage() {
  // State untuk simulasi (nanti diganti dengan logic sebenarnya)
  const [apakahBarcodeSudahDibuat, setApakahBarcodeSudahDibuat] = useState(false)
  const [statusTransaksi, setStatusTransaksi] = useState("sedang-transaksi") // sedang-transaksi | transaksi-selesai | sedang-meminjam | peminjaman-selesai

  // Mock data belanjaan
  const daftarBelanjaan = [
    {
      id: 1,
      name: "Sony WH-1000XM5 Wireless Headphones",
      quantity: 1,
      price: 4500000,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100",
      kategori: "Audio",
    },
    {
      id: 2,
      name: "Canon EOS R6 Mark II Camera Body",
      quantity: 1,
      price: 35000000,
      image: "https://images.unsplash.com/photo-1606980227037-f2cb59211d61?w=100",
      kategori: "Fotografi",
    },
    {
      id: 3,
      name: "Logitech MX Master 3S Mouse",
      quantity: 2,
      price: 1200000,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100",
      kategori: "Komputer",
    },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const totalBelanja = daftarBelanjaan.reduce((total, item) => total + item.price * item.quantity, 0)

  const getStatusConfig = () => {
    const configs = {
      "sedang-transaksi": { label: "Sedang Transaksi", color: "bg-blue-100 text-blue-800" },
      "transaksi-selesai": { label: "Transaksi Selesai", color: "bg-green-100 text-green-800" },
      "sedang-meminjam": { label: "Sedang Meminjam", color: "bg-yellow-100 text-yellow-800" },
      "peminjaman-selesai": { label: "Peminjaman Selesai", color: "bg-purple-100 text-purple-800" },
    }
    return configs[statusTransaksi]
  }

  const handleKembaliKeBeranda = () => {
    // Logic untuk kembali ke beranda akan ditambahkan nanti
    console.log("Kembali ke beranda - transaksi dibatalkan")
  }

  const handleMintaBarcode = () => {
    // Logic untuk request barcode ke server akan ditambahkan nanti
    console.log("Request barcode ke server")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-emerald-600" />
              <h1 className="text-xl font-bold text-gray-900">Halaman Transaksi</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300">
                <Home className="w-5 h-5" />
                <span className="font-medium">Kembali ke Beranda</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Konfirmasi Kembali ke Beranda
                </AlertDialogTitle>
                <AlertDialogDescription className="text-base pt-2">
                  Apakah Anda yakin ingin kembali ke beranda?
                  <span className="block mt-2 font-semibold text-red-600">
                    Transaksi Anda yang sedang berjalan akan dihapus dan tidak dapat dikembalikan.
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleKembaliKeBeranda} className="bg-red-600 hover:bg-red-700">
                  Ya, Kembali ke Beranda
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LAYOUT TENGAH - Daftar Belanjaan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-emerald-600" />
                Daftar Belanjaan
              </h2>

              <div className="space-y-4">
                {daftarBelanjaan.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">Kategori: {item.kategori}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Jumlah: <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{formatCurrency(item.price)} / item</p>
                          <p className="text-lg font-bold text-emerald-600">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Belanja */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Belanja:</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatCurrency(totalBelanja)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* LAYOUT KANAN - Barcode & Status */}
          <div className="lg:col-span-1 space-y-4">
            {/* Status Transaksi */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Transaksi</h3>
              <div className="flex justify-center">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusConfig().color}`}>
                  {getStatusConfig().label}
                </span>
              </div>
            </div>

            {/* Card Barcode */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-600" />
                Barcode Transaksi
              </h3>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                {apakahBarcodeSudahDibuat ? (
                  <div className="flex flex-col items-center">
                    {/* Placeholder untuk barcode - nanti diganti dengan komponen barcode real */}
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <QrCode className="w-32 h-32 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 text-center">Scan barcode ini di kasir</p>
                    <p className="text-xs text-gray-500 mt-2">Kode: TRX-2025-{Math.floor(Math.random() * 10000)}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <QrCode className="w-12 h-12 text-gray-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Barcode Belum Dibuat</h4>
                    <p className="text-sm text-gray-600">Klik tombol di bawah untuk meminta barcode transaksi</p>
                  </div>
                )}
              </div>

              {/* Tombol Minta Barcode */}
              <button
                onClick={handleMintaBarcode}
                disabled={apakahBarcodeSudahDibuat}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  apakahBarcodeSudahDibuat
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {apakahBarcodeSudahDibuat ? "Barcode Sudah Dibuat" : "Minta Barcode"}
              </button>

              {apakahBarcodeSudahDibuat && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 text-center">
                    ✓ Barcode berhasil dibuat! Tunjukkan ke kasir untuk melanjutkan.
                  </p>
                </div>
              )}
            </div>

            {/* Info Tambahan */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Informasi
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Barcode berlaku selama 15 menit</li>
                <li>• Pastikan koneksi internet stabil</li>
                <li>• Tunjukkan barcode ke kasir</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
