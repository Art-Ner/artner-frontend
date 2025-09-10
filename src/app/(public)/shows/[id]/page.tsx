type Props = { params: Promise<{ id: string }> };

async function getDetail(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/bff/shows/${id}`,
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function ShowDetail({ params }: Props) {
  const { id } = await params;
  const data = await getDetail(id);
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="text-lg font-semibold">
          {data?.show?.title ?? '공연 정보 준비중'}
        </div>
        <div className="text-sm text-gray-600">
          {data?.show?.venueName} · {data?.show?.dateRange}
        </div>
      </div>
      <div className="card">
        <div className="font-medium mb-2">좌석 미리보기</div>
        <div className="text-sm">
          잔여 {data?.seatsPreview?.remain ?? 0} / 전체{' '}
          {data?.seatsPreview?.total ?? 0}
        </div>
      </div>
      <div className="card">
        <div className="font-medium mb-2">할인</div>
        <div className="text-sm">
          {data?.discounts?.bestLabel ?? '적용 가능한 할인 없음'}
        </div>
      </div>
    </div>
  );
}
