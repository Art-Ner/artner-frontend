import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 60;

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ id, remain: 132, total: 500 });
}
