import { FoundBarang } from '@/types/global';

export function insertBarangEvent(key: string, value: FoundBarang[]) {
  window.dispatchEvent(
    new CustomEvent('cartUpdate', {
      detail: {
        key: key,
        newValue: value,
      },
    })
  );
}

interface BarangEventType {
  judulEvent: string;
  key?: string;
  value?: any;
}

export function BarangEvent({ judulEvent, key, value }: BarangEventType) {
  window.dispatchEvent(
    new CustomEvent(judulEvent, {
      detail: {
        key: key,
        value: value,
      },
    })
  );
}
