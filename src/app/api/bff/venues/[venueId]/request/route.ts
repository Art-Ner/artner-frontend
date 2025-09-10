import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { noStore } from '@/lib/utils';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ venueId: string }> }
) {
  const { venueId } = await params;
  const payload = await req.json().catch(() => ({}));
  return NextResponse.json(
    {
      ok: true,
      venueId,
      requestId: `bk_${Date.now()}`,
      received: payload,
    },
    { headers: noStore() }
  );
}
