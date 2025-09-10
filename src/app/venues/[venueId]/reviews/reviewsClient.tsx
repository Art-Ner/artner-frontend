'use client';

import {
  createVenueReview,
  deleteVenueReview,
  fetchVenueReviews,
  updateVenueReview,
} from '@/slices/reviews/queries';
import { useEffect, useState } from 'react';

import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';
import { Textarea } from '@/ui/components/ui/textarea';

export default function ReviewsClient({ venueId }: { venueId: string }) {
  const [items, setItems] = useState<Array<any>>([]);
  const [rate, setRate] = useState<number>(5);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function load() {
    const data = await fetchVenueReviews(venueId);
    setItems(Array.isArray(data) ? data : data?.items ?? []);
  }

  useEffect(() => {
    load();
  }, [venueId]);

  async function onCreate() {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const created = await createVenueReview(venueId, {
        rate,
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
      const updated = await updateVenueReview(venueId, {
        rate,
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
      await deleteVenueReview(venueId);
      setItems((prev) => prev.filter((r) => String(r.user?.id) !== '1'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">공간 리뷰</h1>
      <div className="grid gap-3 max-w-md">
        <div>
          <label className="block text-sm mb-1">평점 (1-5)</label>
          <Input
            type="number"
            min={1}
            max={5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">내용</label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
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
              <div className="text-sm">작성자: {r.user?.name ?? r.user?.id}</div>
              <div className="text-sm">평점: {r.rate}</div>
              <div className="text-sm text-muted-foreground">{r.content}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}



