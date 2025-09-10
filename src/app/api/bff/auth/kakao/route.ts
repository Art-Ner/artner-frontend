import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(_req: NextRequest) {
  // 실제 환경에선 백엔드에 코드 교환을 프록시하거나 쿠키를 세팅합니다.
  return NextResponse.json({ ok: true, provider: 'kakao' });
}
