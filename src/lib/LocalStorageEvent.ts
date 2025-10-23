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

interface BarangEventType<T = unknown> {
  judulEvent: string;
  key?: string;
  value?: T;
}

export function BarangEvent<T>({ judulEvent, key, value }: BarangEventType<T>) {
  window.dispatchEvent(
    new CustomEvent(judulEvent, {
      detail: {
        key: key,
        value: value,
      },
    })
  );
}
