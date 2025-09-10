import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { noStore } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 데모: 로그인된 사용자 정보를 반환. 실제 구현은 세션 기반.
  return NextResponse.json(
    {
      id: 1,
      email: 'demo@artner.local',
      username: '데모유저',
      role: 'USER',
    },
    { headers: noStore() }
  );
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const updated = {
    id: 1,
    email: body?.email ?? 'demo@artner.local',
    username: body?.username ?? '데모유저',
    role: 'USER',
  };
  return NextResponse.json(updated);
}
