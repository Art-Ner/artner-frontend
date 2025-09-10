import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export async function POST(
  _: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  return NextResponse.json(
    { ok: true, postId, state: 'accepted' },
    { headers: noStore() }
  );
}
