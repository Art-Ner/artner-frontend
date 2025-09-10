'use client';
import { useState } from 'react';

import { fetchMe } from '@/slices/auth/queries';
import { updateMe, updateMyProfileImage } from '@/slices/users/queries';
import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';

export default function MePage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [me, setMe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchMe();
      setMe(data);
      setEmail(data?.email ?? '');
      setUsername(data?.username ?? '');
    } finally {
      setLoading(false);
    }
  }

  async function onSave() {
    setLoading(true);
    try {
      const updated = await updateMe({ email, username });
      setMe(updated);
    } finally {
      setLoading(false);
    }
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const r = await updateMyProfileImage(file);
      setMe((prev: any) => ({ ...prev, profile_image_url: r?.url }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">내 정보</h1>

      <div className="flex gap-3">
        <Button onClick={load} disabled={loading} variant="outline">
          불러오기
        </Button>
        <Button onClick={onSave} disabled={loading}>
          저장
        </Button>
      </div>

      <div className="grid gap-3 max-w-md">
        <div>
          <label className="block text-sm mb-1">이메일</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">이름</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">프로필 이미지</label>
          <input type="file" accept="image/*" onChange={onUpload} />
        </div>
      </div>

      <section>
        <h2 className="font-medium">현재 값</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(me, null, 2)}
        </pre>
      </section>
    </main>
  );
}
