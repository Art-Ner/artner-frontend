import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const created = {
    id: Math.floor(Math.random() * 10000),
    headline: body?.headline ?? '',
    bio: body?.bio ?? '',
    url_primary: body?.url_primary ?? '',
    url_secondary: body?.url_secondary ?? '',
    url_tertiary: body?.url_tertiary ?? '',
  };
  return NextResponse.json(created);
}


