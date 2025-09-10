import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json(
      { error: 'multipart/form-data required' },
      { status: 400 }
    );
  }
  // 데모: 업로드 된 것으로 가정하고 URL 반환
  return NextResponse.json({ url: 'https://example.com/profile/demo.jpg' });
}
