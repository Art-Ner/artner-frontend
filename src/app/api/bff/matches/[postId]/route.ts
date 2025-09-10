import { NextResponse } from 'next/server';

import { MatchPost } from '@/lib/schemas';
import { cacheHeader } from '@/lib/utils';

export const revalidate = 120;

export async function GET(
  _: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const body = {
    id: postId,
    title: '공연 기획 팀 빌딩',
    roles: [
      { role: '보컬', count: 1 },
      { role: '기타', count: 1 },
    ],
    owner: { name: '기획자 K', verifiedHistory: true },
    applyState: 'none',
  } as const;
  return NextResponse.json(MatchPost.parse(body), {
    headers: cacheHeader(120),
  });
}
