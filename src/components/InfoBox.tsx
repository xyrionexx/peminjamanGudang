import { AlertCircle } from "lucide-react";

export const InfoBox = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        Informasi
      </h4>
      <ul className="text-sm text-green-800 space-y-1">
        <li>• Barcode berlaku selama 15 menit</li>
        <li>• Pastikan koneksi internet stabil</li>
        <li>• Tunjukkan barcode ke admin gudang</li>
      </ul>
    </div>
  );
};