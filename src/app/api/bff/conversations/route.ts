import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const demoConversations = [
  {
    id: 'c1',
    title: '프로젝트 A 협업',
    lastMessage: '자료 공유드립니다.',
    updated_at: new Date().toISOString(),
    participants: [
      { id: 1, name: '데모유저' },
      { id: 2, name: '상대방' },
    ],
  },
  {
    id: 'c2',
    title: '대관 문의',
    lastMessage: '일정 확인 부탁드려요.',
    updated_at: new Date(Date.now() - 3600_000).toISOString(),
    participants: [
      { id: 1, name: '데모유저' },
      { id: 3, name: '운영자' },
    ],
  },
];

export async function GET(_req: NextRequest) {
  return NextResponse.json(
    { items: demoConversations },
    { headers: noStore() }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const created = {
    id: `c${Math.floor(Math.random() * 10000)}`,
    title: body?.title ?? '새 대화',
    lastMessage: '',
    updated_at: new Date().toISOString(),
    participants: body?.participants ?? [],
  };
  return NextResponse.json(created);
}
