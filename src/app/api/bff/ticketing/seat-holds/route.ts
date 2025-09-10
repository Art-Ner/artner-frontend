import { revalidateTag } from 'next/cache';
import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';


export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req
    .json()
    .catch(() => ({ seatIds: [] as string[], showId: '' }));
  const { seatIds = [], showId = '' } = body;
  if (showId) {
    revalidateTag(`show:${showId}:avail`);
  }
  return NextResponse.json(
    { ok: true, locked: seatIds, showId },
    { headers: noStore() }
  );
}
