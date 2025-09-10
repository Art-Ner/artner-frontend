import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(_req: NextRequest) {
  // 실제 환경에선 세션 쿠키를 만료시키거나 백엔드에 로그아웃을 위임합니다.
  return NextResponse.json({ ok: true });
}
