'use client';

import { signupWithGoogle, signupWithKakao } from '@/slices/auth/queries';

import { Button } from '@/ui/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function onKakao() {
    setLoading(true);
    try {
      const r = await signupWithKakao();
      setResult(r);
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setLoading(true);
    try {
      const r = await signupWithGoogle();
      setResult(r);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">회원가입 (소셜)</h1>
      <div className="text-sm text-gray-600">
        <Link href="/" className="underline mr-3">
          홈으로
        </Link>
        <Link href="/login" className="underline">
          로그인
        </Link>
      </div>
      <div className="flex gap-3">
        <Button onClick={onKakao} disabled={loading}>
          카카오로 시작하기
        </Button>
        <Button onClick={onGoogle} disabled={loading} variant="secondary">
          구글로 시작하기
        </Button>
      </div>
      {result ? (
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </main>
  );
}
