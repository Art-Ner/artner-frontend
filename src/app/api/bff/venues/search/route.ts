import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { VenueCard } from '@/lib/schemas';
import { cacheHeader } from '@/lib/utils';

export const revalidate = 120;

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams;
  const region = q.get('region') ?? '서울';
  const seats = Number(q.get('seats') ?? 100);
  const list = [
    {
      id: 'v1',
      name: '아트홀 A',
      region,
      seatCount: Math.max(120, seats),
      stageType: '프로시니엄',
      priceRange: [200000, 800000],
      availableDates: ['2025-10-12', '2025-10-19'],
    },
    {
      id: 'v2',
      name: '블랙박스 B',
      region,
      seatCount: Math.max(80, seats),
      stageType: '블랙박스',
      priceRange: [150000, 500000],
      availableDates: ['2025-10-15'],
    },
  ];
  return NextResponse.json(
    { venues: list.map((v) => VenueCard.parse(v)) },
    { headers: cacheHeader(120) }
  );
}
