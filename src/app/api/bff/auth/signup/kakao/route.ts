import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(_req: NextRequest) {
  // 실제 구현: 카카오 OAuth 동의 → 백엔드에 code 교환 → 신규 유저 생성
  return NextResponse.json({ ok: true, provider: 'kakao', mode: 'signup' });
}


