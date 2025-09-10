import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const seatIds =
    new URL(req.url).searchParams.get('seatIds')?.split(',').filter(Boolean) ??
    [];
  const locked = seatIds.slice(0, Math.max(0, seatIds.length - 1));
  const body = {
    canLockAll: locked.length === seatIds.length,
    lockedSeatIds: locked,
    price: {
      original: 100000,
      discounted: 80000,
      discountLabel: '얼리버드 20%',
    },
    showId: id,
  };
  return NextResponse.json(body, { headers: noStore() });
}
