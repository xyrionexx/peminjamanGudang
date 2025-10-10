'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  message = 'Waduh gagal mengambil barang nih',
  onRetry,
}: ErrorDisplayProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>

        <h3 className="mb-2 text-xl font-semibold text-foreground">Terjadi Kesalahan</h3>

        <p className="mb-6 text-muted-foreground">{message}</p>

        {onRetry && (
          <Button onClick={onRetry} variant="default">
            Coba ambil lagi
          </Button>
        )}
      </div>
    </div>
  );
}
