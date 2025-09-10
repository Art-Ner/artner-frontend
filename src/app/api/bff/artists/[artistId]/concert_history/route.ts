import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const { artistId: id } = await params;
  const items = [
    {
      id: `${id}-c1`,
      work_title: '뮤지컬 A',
      role: 'ACTOR',
      started_on: '2022-03-01',
    },
    {
      id: `${id}-c2`,
      work_title: '공연 B',
      role: 'SINGER',
      started_on: '2023-07-15',
    },
  ];
  return NextResponse.json({ items }, { headers: noStore() });
}
