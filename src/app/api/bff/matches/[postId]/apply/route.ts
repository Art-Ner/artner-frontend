import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const payload = await req.json().catch(() => ({}));
  return NextResponse.json(
    { ok: true, postId, state: 'applied', received: payload },
    { headers: noStore() }
  );
}
