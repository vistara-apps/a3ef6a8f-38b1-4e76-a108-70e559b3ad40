'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'wagmi/chains';
import { type ReactNode } from 'react';
import { ThemeProvider } from '@/lib/theme-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MiniKitProvider
        chain={base}
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'cdp_demo_key'}
      >
        {children}
      </MiniKitProvider>
    </ThemeProvider>
  );
}
