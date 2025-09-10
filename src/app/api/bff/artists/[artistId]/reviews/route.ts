import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function demoUserReviews(artistId: string) {
  return [
    { id: `${artistId}-ur1`, user: { id: 20, name: '동료1' }, content: '협업이 원활했습니다.', created_at: new Date(Date.now() - 7200_000).toISOString() },
    { id: `${artistId}-ur2`, user: { id: 21, name: '동료2' }, content: '시간 약속이 철저합니다.', created_at: new Date(Date.now() - 3600_000).toISOString() },
  ];
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const { artistId } = await params;
  return NextResponse.json({ items: demoUserReviews(artistId) }, { headers: noStore() });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const { artistId } = await params;
  const { content } = await req.json();
  const created = {
    id: `${artistId}-ur${Math.floor(Math.random() * 10000)}`,
    user: { id: 1, name: '데모유저' },
    content,
    created_at: new Date().toISOString(),
  };
  return NextResponse.json(created);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const { artistId } = await params;
  const { content } = await req.json();
  const updated = {
    id: `${artistId}-ur-self`,
    user: { id: 1, name: '데모유저' },
    content,
    created_at: new Date().toISOString(),
  };
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const { artistId } = await params;
  return NextResponse.json({ ok: true, deleted: `${artistId}-ur-self` });
}


