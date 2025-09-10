import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function demoMessages(id: string) {
  return [
    {
      id: `${id}-m1`,
      sender: { id: 2, name: '상대방' },
      body: '안녕하세요!',
      created_at: new Date(Date.now() - 7200_000).toISOString(),
    },
    {
      id: `${id}-m2`,
      sender: { id: 1, name: '데모유저' },
      body: '안녕하세요, 자료 공유드립니다.',
      created_at: new Date(Date.now() - 3600_000).toISOString(),
    },
  ];
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  const { conversationId } = await params;
  const items = demoMessages(conversationId);
  return NextResponse.json({ items }, { headers: noStore() });
}
