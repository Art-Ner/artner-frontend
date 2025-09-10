import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const signature =
    req.headers.get('Toss-Signature') || req.headers.get('toss-signature');
  const body = await req.text();
  // TODO: 시그니처 검증 (시크릿으로 HMAC 검증)
  // 참고: https://docs.tosspayments.com/reference#%EC%9B%B9%ED%9B%85
  // 데모로 200 OK만 반환
  return NextResponse.json({ ok: true });
}
