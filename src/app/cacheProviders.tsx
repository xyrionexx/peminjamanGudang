'use client';

import { Query, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/config/queryClient';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { persister as StoragePersister } from '@/config/queryClientPersistence';

export function CacheProviders({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: StoragePersister,
        maxAge: 1000 * 60 * 60 * 24,
        dehydrateOptions: {
          shouldDehydrateQuery: (query: Query<unknown, Error, unknown, readonly unknown[]>) => {
            const key = query.queryKey;
            const includesCheckout = (val: unknown): boolean => {
              if (typeof val === 'string') {
                return val === 'checkoutItem' || val.includes('checkoutItem');
              }

              if (Array.isArray(val)) return val.some(includesCheckout);
              return false;
            };
            return !includesCheckout(key);
          },
        },
      }}
      onSuccess={() => console.log('success')}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PersistQueryClientProvider>
  );
}
