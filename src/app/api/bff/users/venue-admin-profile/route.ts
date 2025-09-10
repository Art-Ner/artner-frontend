import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const created = {
    id: Math.floor(Math.random() * 10000),
    business_reg_number: body?.business_reg_number ?? '',
  };
  return NextResponse.json(created);
}


