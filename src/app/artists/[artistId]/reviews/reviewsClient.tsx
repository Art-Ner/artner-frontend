'use client';

import {
  createUserReview,
  deleteUserReview,
  fetchUserReviews,
  updateUserReview,
} from '@/slices/reviews/queries';
import { useEffect, useState } from 'react';

import { Button } from '@/ui/components/ui/button';
import { Textarea } from '@/ui/components/ui/textarea';

export default function ReviewsClient({ artistId }: { artistId: string }) {
  const [items, setItems] = useState<Array<any>>([]);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function load() {
    const data = await fetchUserReviews(artistId);
    setItems(Array.isArray(data) ? data : data?.items ?? []);
  }

  useEffect(() => {
    load();
  }, [artistId]);

  async function onCreate() {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const created = await createUserReview(artistId, {
        content: content.trim(),
      });
      setItems((prev) => [...prev, created]);
      setContent('');
    } finally {
      setLoading(false);
    }
  }

  async function onUpdate() {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const updated = await updateUserReview(artistId, {
        content: content.trim(),
      });
      setItems((prev) => {
        const next = [...prev];
        const idx = next.findIndex((r) => String(r.user?.id) === '1');
        if (idx >= 0) next[idx] = updated;
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    setLoading(true);
    try {
      await deleteUserReview(artistId);
      setItems((prev) => prev.filter((r) => String(r.user?.id) !== '1'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">유저간 리뷰</h1>
      <div className="grid gap-3 max-w-md">
        <div>
          <label className="block text-sm mb-1">내용</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={onCreate} disabled={loading}>
            작성
          </Button>
          <Button onClick={onUpdate} disabled={loading} variant="secondary">
            수정
          </Button>
          <Button onClick={onDelete} disabled={loading} variant="destructive">
            삭제
          </Button>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="font-medium">리뷰 목록</h2>
        <ul className="space-y-2">
          {items.map((r) => (
            <li key={r.id} className="border p-3 rounded">
              <div className="text-sm">
                작성자: {r.user?.name ?? r.user?.id}
              </div>
              <div className="text-sm text-muted-foreground">{r.content}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}


