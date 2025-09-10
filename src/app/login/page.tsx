'use client';

import {
  fetchMe,
  loginWithGoogle,
  loginWithKakao,
  logout,
} from '@/slices/auth/queries';

import { Button } from '@/ui/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [me, setMe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function refreshMe() {
    setLoading(true);
    try {
      const data = await fetchMe();
      setMe(data);
    } finally {
      setLoading(false);
    }
  }

  async function onKakao() {
    setLoading(true);
    try {
      await loginWithKakao();
      await refreshMe();
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setLoading(true);
    try {
      await loginWithGoogle();
      await refreshMe();
    } finally {
      setLoading(false);
    }
  }

  async function onLogout() {
    setLoading(true);
    try {
      await logout();
      setMe(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">로그인</h1>
      <div className="text-sm text-gray-600">
        <Link href="/" className="underline mr-3">
          홈으로
        </Link>
        <Link href="/signup" className="underline">
          회원가입
        </Link>
      </div>
      <div className="flex gap-3">
        <Button onClick={onKakao} disabled={loading}>
          카카오로 로그인
        </Button>
        <Button onClick={onGoogle} disabled={loading} variant="secondary">
          구글로 로그인
        </Button>
        <Button onClick={onLogout} disabled={loading} variant="destructive">
          로그아웃
        </Button>
        <Button onClick={refreshMe} disabled={loading} variant="outline">
          내 정보 불러오기
        </Button>
      </div>
      <section>
        <h2 className="font-medium">내 정보</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(me, null, 2)}
        </pre>
      </section>
    </main>
  );
}
