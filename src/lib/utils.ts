import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- app utilities (BFF/cache/trace) ---
export function cacheHeader(ttl: number) {
  return { 'Cache-Control': `public, s-maxage=${ttl}, max-age=${ttl}` };
}

export function noStore() {
  return { 'Cache-Control': 'no-store' };
}

export function traceId() {
  return Math.random().toString(36).slice(2);
}
