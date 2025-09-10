import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = [
    {
      id: 't1',
      performance_id: 'p1',
      title: '공연 A',
      status: 'PAID',
      purchased_at: new Date().toISOString(),
    },
    {
      id: 't2',
      performance_id: 'p2',
      title: '공연 B',
      status: 'CANCELLED',
      purchased_at: new Date(Date.now() - 86400_000).toISOString(),
    },
  ];
  return NextResponse.json({ items }, { headers: noStore() });
}
