import Link from 'next/link';
import type { Route } from 'next';
import { getHomeData } from '@/lib/homeData';

export const revalidate = 300;

export default async function Page() {
  const data = getHomeData();
  const staticLinks: Array<{ href: Route; label: string }> = [
    { href: '/' as Route, label: '홈' },
    { href: '/login' as Route, label: '로그인' },
    { href: '/signup' as Route, label: '회원가입' },
    { href: '/payments/toss/fail' as Route, label: '토스 결제 실패' },
    { href: '/payments/toss/success' as Route, label: '토스 결제 성공' },
    { href: '/me' as Route, label: '내 정보' },
    { href: '/artists' as Route, label: '아티스트 목록' },
    { href: '/profile/new' as Route, label: '프로필 생성' },
    { href: '/conversations' as Route, label: '대화 목록' },
    { href: '/notifications' as Route, label: '알림' },
    { href: '/performances' as Route, label: '공연 목록' },
    { href: '/bookings' as Route, label: '예약 목록' },
    { href: '/venues' as Route, label: '공연장 목록' },
    { href: '/venue' as Route, label: '베뉴(운영자)' },
    { href: '/realtime' as Route, label: '실시간' },
  ];
  const dynamicSampleLinks: Array<{ href: Route; label: string }> = [
    { href: '/artists/a1/reviews' as Route, label: '아티스트 리뷰 (artistId=a1)' },
    { href: '/venues/v1/reviews' as Route, label: '공연장 리뷰 (venueId=v1)' },
    { href: '/performances/p1/purchase' as Route, label: '공연 구매 (performanceId=p1)' },
    { href: '/artists/a1/portfolio' as Route, label: '아티스트 포트폴리오 (artistId=a1)' },
    { href: '/conversations/c1' as Route, label: '대화 상세 (conversationId=c1)' },
    { href: '/performances/p1' as Route, label: '공연 상세 (performanceId=p1)' },
    { href: '/venues/v1' as Route, label: '공연장 상세 (venueId=v1)' },
    { href: '/shows/s1' as Route, label: '쇼 상세 (id=s1)' },
  ];
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-xl font-semibold mb-4">오늘의 공연</h1>
        <div className="space-y-3">
          {data?.shows?.map((show: any) => (
            <Link key={show.id} href={`/shows/${show.id}`} className="card block">
              <div className="font-medium">{show.title}</div>
              <div className="text-sm text-gray-600">
                {show.venueName} · {show.dateRange}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {!!data?.ranking?.length && (
        <section>
          <h2 className="text-lg font-semibold mb-3">랭킹</h2>
          <div className="space-y-2">
            {data.ranking.map((rankItem: any, index: number) => {
              const show = data?.shows?.find((s: any) => s.id === rankItem.id);
              return (
                <Link
                  key={rankItem.id}
                  href={`/shows/${rankItem.id}`}
                  className="block underline"
                >
                  <span className="mr-2">#{index + 1}</span>
                  <span>{show?.title ?? rankItem.id}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {!!data?.closingSoon?.length && (
        <section>
          <h2 className="text-lg font-semibold mb-3">마감 임박</h2>
          <div className="space-y-2">
            {data.closingSoon.map((item: any) => {
              const show = data?.shows?.find((s: any) => s.id === item.id);
              return (
                <Link
                  key={item.id}
                  href={`/shows/${item.id}`}
                  className="block underline"
                >
                  <span>{show?.title ?? item.id}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold mb-3">계정</h2>
        <div className="flex gap-4">
          <Link href="/login" className="underline">
            로그인
          </Link>
          <Link href="/signup" className="underline">
            회원가입
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">모든 페이지</h2>
        <div className="grid gap-6 grid-cols-1">
          <div>
            <h3 className="font-medium mb-2">정적 경로</h3>
            <ul className="list-disc pl-6 space-y-1">
              {staticLinks.map((item) => (
                <li key={item.href} className="flex items-center gap-2">
                  <span className="text-gray-700">{item.label}:</span>
                  <Link href={item.href} className="underline">
                    {item.href}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">동적 경로 (샘플)</h3>
            <ul className="list-disc pl-6 space-y-1">
              {dynamicSampleLinks.map((item) => (
                <li key={item.href} className="flex items-center gap-2">
                  <span className="text-gray-700">{item.label}:</span>
                  <Link href={item.href} className="underline">
                    {item.href}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
