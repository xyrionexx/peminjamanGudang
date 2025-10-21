import { QrCode } from "lucide-react";

const generateTransactionCode = (): string => {
  return `TRX-2025-${Math.floor(Math.random() * 10000)}`;
};

interface BarcodeDisplayProps {
  isGenerated: boolean;
}

export const BarcodeDisplay = ({ isGenerated }: BarcodeDisplayProps) => {
  if (isGenerated) {
    return (
      <div className="flex flex-col items-center">
        {/* Placeholder for actual barcode component */}
        <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <QrCode className="w-32 h-32 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600 text-center">Scan barcode ini di gudang</p>
        <p className="text-xs text-gray-500 mt-2">Kode: {generateTransactionCode()}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <QrCode className="w-12 h-12 text-gray-400" />
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">Barcode Belum Dibuat</h4>
      <p className="text-sm text-gray-600">Klik tombol di bawah untuk meminta barcode transaksi</p>
    </div>
  );
};

interface BarcodeSectionProps {
  isBarcodeGenerated: boolean;
  onRequestBarcode: () => void;
}

export const BarcodeSection = ({ isBarcodeGenerated, onRequestBarcode }: BarcodeSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Section Header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <QrCode className="w-5 h-5 text-emerald-600" />
        Barcode Transaksi
      </h3>

      {/* Barcode Container */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
        <BarcodeDisplay isGenerated={isBarcodeGenerated} />
      </div>

      {/* Request Barcode Button */}
      <button
        onClick={onRequestBarcode}
        disabled={isBarcodeGenerated}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          isBarcodeGenerated
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-emerald-600 text-white hover:bg-emerald-700'
        }`}
      >
        {isBarcodeGenerated ? 'Barcode Sudah Dibuat' : 'Minta Barcode'}
      </button>

      {/* Success Message */}
      {isBarcodeGenerated && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 text-center">
            ✓ Barcode berhasil dibuat! Tunjukkan ke admin gudang untuk melanjutkan.
          </p>
        </div>
      )}
    </div>
  );
};