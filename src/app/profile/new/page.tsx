"use client";
import { useState } from 'react';

import { createArtistProfile, createVenueAdminProfile } from '@/slices/users/queries';
import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';
import { Textarea } from '@/ui/components/ui/textarea';

type Mode = 'artist' | 'venue_admin';

export default function NewProfilePage() {
  const [mode, setMode] = useState<Mode>('artist');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // artist fields
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('');

  // venue admin fields
  const [bizNo, setBizNo] = useState('');

  async function onSubmit() {
    setLoading(true);
    try {
      if (mode === 'artist') {
        const created = await createArtistProfile({
          headline,
          bio,
          url_primary: url1,
          url_secondary: url2,
          url_tertiary: url3,
        });
        setResult(created);
      } else {
        const created = await createVenueAdminProfile({ business_reg_number: bizNo });
        setResult(created);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">프로필 생성</h1>
      <div className="flex gap-2">
        <Button variant={mode === 'artist' ? 'default' : 'outline'} onClick={() => setMode('artist')}>
          아티스트 프로필
        </Button>
        <Button variant={mode === 'venue_admin' ? 'default' : 'outline'} onClick={() => setMode('venue_admin')}>
          공간 사업자 프로필
        </Button>
      </div>

      {mode === 'artist' ? (
        <section className="space-y-3">
          <div>
            <label className="block text-sm mb-1">헤드라인</label>
            <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="한 줄 소개" />
          </div>
          <div>
            <label className="block text-sm mb-1">소개</label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="자유 소개" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input value={url1} onChange={(e) => setUrl1(e.target.value)} placeholder="대표 URL" />
            <Input value={url2} onChange={(e) => setUrl2(e.target.value)} placeholder="보조 URL" />
            <Input value={url3} onChange={(e) => setUrl3(e.target.value)} placeholder="기타 URL" />
          </div>
        </section>
      ) : (
        <section className="space-y-3">
          <div>
            <label className="block text-sm mb-1">사업자등록번호</label>
            <Input value={bizNo} onChange={(e) => setBizNo(e.target.value)} placeholder="10자리 숫자" />
          </div>
        </section>
      )}

      <Button onClick={onSubmit} disabled={loading}>
        생성하기
      </Button>

      {result ? (
        <section>
          <h2 className="font-medium">생성 결과</h2>
          <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
        </section>
      ) : null}
    </main>
  );
}


