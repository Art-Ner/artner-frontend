import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function demoVenueReviews(venueId: string) {
  return [
    { id: `${venueId}-r1`, user: { id: 10, name: '관객1' }, rate: 5, content: '최고였어요!', created_at: new Date(Date.now() - 86400_000).toISOString() },
    { id: `${venueId}-r2`, user: { id: 11, name: '관객2' }, rate: 4, content: '음향이 좋았습니다.', created_at: new Date(Date.now() - 43200_000).toISOString() },
  ];
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ venueId: string }> }
) {
  const { venueId } = await params;
  return NextResponse.json({ items: demoVenueReviews(venueId) }, { headers: noStore() });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ venueId: string }> }
) {
  const { venueId } = await params;
  const { rate, content } = await req.json();
  const created = {
    id: `${venueId}-r${Math.floor(Math.random() * 10000)}`,
    user: { id: 1, name: '데모유저' },
    rate,
    content,
    created_at: new Date().toISOString(),
  };
  return NextResponse.json(created);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ venueId: string }> }
) {
  const { venueId } = await params;
  const { rate, content } = await req.json();
  const updated = {
    id: `${venueId}-r-self`,
    user: { id: 1, name: '데모유저' },
    rate,
    content,
    created_at: new Date().toISOString(),
  };
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ venueId: string }> }
) {
  const { venueId } = await params;
  return NextResponse.json({ ok: true, deleted: `${venueId}-r-self` });
}


