import { NextResponse } from 'next/server';
import { cacheHeader } from '@/lib/utils';
import { getHomeData } from '@/lib/homeData';

export const revalidate = 300;

export async function GET() {
  const body = getHomeData();
  return NextResponse.json(body, { headers: cacheHeader(300) });
}
