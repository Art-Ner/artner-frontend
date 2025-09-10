'use client';

import Link from 'next/link';
import React from 'react';

export default function AppHeader() {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white/90 border-b backdrop-blur supports-[backdrop-filter]:bg-white/70 z-50">
      <div className="h-14 flex items-center justify-between px-3">
        <Link href="/" className="font-semibold">
          ARTner
        </Link>
        <nav className="text-sm">
          <Link href="/artists" className="underline">
            검색
          </Link>
        </nav>
      </div>
    </header>
  );
}
