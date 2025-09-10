import './globals.css';

import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/ui/components/app-header';
import BottomNav from '@/ui/components/bottom-nav';

export const metadata = {
  title: 'ARTner',
  description: 'Matching · Venues · Ticketing',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <AppHeader />
        <main className="page has-header has-bottom-nav">{children}</main>
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white/90 border-t backdrop-blur supports-[backdrop-filter]:bg-white/70 h-14">
          <div className="px-3 h-full flex items-center">
            <BottomNav />
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
