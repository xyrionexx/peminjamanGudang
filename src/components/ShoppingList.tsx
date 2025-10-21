import { Trash2, Package } from "lucide-react";

interface ItemBelanjaan {
  id: number;
  name: string;
  quantity: number;
  image: string;
  kategori: string;
}

interface ShoppingListSectionProps {
  daftarBelanjaan: ItemBelanjaan[];
  onDeleteItem: (id: number) => void;
}

interface ShoppingItemCardProps {
  item: ItemBelanjaan;
  onDelete: (id: number) => void;
}

const calculateTotalQuantity = (items: ItemBelanjaan[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const ShoppingItemCard = ({ item, onDelete }: ShoppingItemCardProps) => {
  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
      {/* Product Image */}
      <img
        src={item.image || '/placeholder.svg'}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
      />

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2">Kategori: {item.kategori}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Jumlah: <span className="font-medium">{item.quantity}</span>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(item.id)}
        className="flex items-center justify-center w-10 h-10 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        title="Hapus barang ini dari transaksi"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export const ShoppingListSection = ({ daftarBelanjaan, onDeleteItem }: ShoppingListSectionProps) => {
  const totalJumlahBarang = calculateTotalQuantity(daftarBelanjaan);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Section Header */}
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Package className="w-6 h-6 text-emerald-600" />
        Daftar Belanjaan
      </h2>

      {/* Items List */}
      <div className="space-y-4">
        {daftarBelanjaan.map((item) => (
          <ShoppingItemCard key={item.id} item={item} onDelete={onDeleteItem} />
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total Jumlah Barang:</span>
          <span className="text-2xl font-bold text-emerald-600">{totalJumlahBarang}</span>
        </div>
      </div>
    </div>
  );
};
