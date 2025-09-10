import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const { artistId: id } = await params;
  const body = {
    id,
    username: id === 'a1' ? '홍길동' : id === 'a2' ? '김철수' : '이영희',
    headline: '보컬 / 작곡',
    bio: '자기소개 텍스트',
    urls: ['https://example.com'],
  };
  return NextResponse.json(body, { headers: noStore() });
}
