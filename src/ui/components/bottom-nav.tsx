'use client';

import { Home, MessageCircle, Search, Ticket, User } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';


type NavItem = {
  href: Route;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  matchPrefix?: boolean;
};

const NAV_ITEMS: Array<NavItem> = [
  { href: '/' as Route, label: '홈', Icon: Home, matchPrefix: false },
  { href: '/performances' as Route, label: '공연', Icon: Search, matchPrefix: true },
  { href: '/bookings' as Route, label: '예매', Icon: Ticket, matchPrefix: true },
  {
    href: '/conversations' as Route,
    label: '메시지',
    Icon: MessageCircle,
    matchPrefix: true,
  },
  { href: '/me' as Route, label: '내 정보', Icon: User, matchPrefix: true },
];

export default function BottomNav() {
  const pathname = usePathname() || '/';

  return (
    <nav className="flex items-center justify-between text-xs text-gray-600 w-full">
      {NAV_ITEMS.map(({ href, label, Icon, matchPrefix }) => {
        const isActive = matchPrefix
          ? pathname === href || pathname.startsWith(`${href}/`)
          : pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-0.5',
              isActive ? 'text-gray-900' : 'text-gray-500'
            )}
          >
            <Icon className={cn('h-5 w-5', isActive ? '' : 'opacity-80')} />
            <span className="leading-none">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
