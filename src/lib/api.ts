import axios from 'axios';

// Base URL: SSR에서는 환경변수 우선, CSR에서는 window.origin 사용
const BASE_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// ---- Mocking (개발용) ----
if (process.env.NEXT_PUBLIC_ENABLE_API_MOCK !== 'false') {
  // 지연 로딩: axios-mock-adapter가 없어도 앱 구동되게
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
    const { default: MockAdapter } = await import('axios-mock-adapter');
    const mock = new MockAdapter(api, { delayResponse: 300 });

    // 샘플 데이터
    let performances = [
      { id: 'p1', title: 'ARTner 쇼케이스', status: 'DRAFT' },
      { id: 'p2', title: '재즈의 밤', status: 'PUBLISHED' },
    ];
    let bookings = [
      { id: 'b1', performance_id: 'p1', status: 'PENDING' },
      { id: 'b2', performance_id: 'p2', status: 'APPROVED' },
    ];
    let venues = [
      { id: 'v1', name: '아트홀 A' },
      { id: 'v2', name: '라이브홀 B' },
    ];
    let notifications = [
      { id: 'n1', text: '환영합니다', read: false },
      { id: 'n2', text: '이벤트 안내', read: false },
    ];

    // Performances
    mock.onGet(/\/api\/performances$/).reply((config) => {
      const keyword = new URL(config.url || '', BASE_URL).searchParams.get('keyword') || '';
      const items = performances.filter((p) =>
        !keyword || p.title.toLowerCase().includes(keyword.toLowerCase())
      );
      return [200, { items }];
    });
    mock.onGet(/\/api\/performances\/([^/]+)$/).reply(({ url }) => {
      const id = url?.match(/\/api\/performances\/([^/]+)$/)?.[1];
      const found = performances.find((p) => p.id === id) || null;
      return [200, { performance: found }];
    });
    mock.onPost(/\/api\/performances\/new$/).reply(({ data }) => {
      const payload = JSON.parse(data || '{}');
      const id = 'p' + (performances.length + 1);
      const created = { id, title: payload?.title || 'New Performance', status: 'DRAFT' };
      performances = [created, ...performances];
      return [200, created];
    });
    mock.onPut(/\/api\/performances\/([^/]+)$/).reply(({ url, data }) => {
      const id = url?.match(/\/api\/performances\/([^/]+)$/)?.[1];
      const payload = JSON.parse(data || '{}');
      performances = performances.map((p) => (p.id === id ? { ...p, ...payload } : p));
      const updated = performances.find((p) => p.id === id) || null;
      return [200, updated];
    });
    mock.onPatch(/\/api\/performances\/([^/]+)$/).reply(({ url }) => {
      const id = url?.match(/\/api\/performances\/([^/]+)$/)?.[1];
      performances = performances.map((p) => (p.id === id ? { ...p, status: 'PUBLISHED' } : p));
      const updated = performances.find((p) => p.id === id) || null;
      return [200, updated];
    });
    mock.onDelete(/\/api\/performances\/([^/]+)$/).reply(({ url }) => {
      const id = url?.match(/\/api\/performances\/([^/]+)$/)?.[1];
      performances = performances.filter((p) => p.id !== id);
      return [200, { ok: true }];
    });
    mock.onGet(/\/api\/performances\/([^/]+)\/tickets$/).reply(({ url }) => {
      const id = url?.match(/\/api\/performances\/([^/]+)\/tickets$/)?.[1];
      return [200, { performance_id: id, items: [{ id: 't1', seat: 'A1' }] }];
    });

    // Bookings
    mock.onPost(/\/api\/bookings$/).reply(({ data }) => {
      const id = 'b' + (bookings.length + 1);
      const payload = JSON.parse(data || '{}');
      const created = { id, ...payload, status: 'PENDING' };
      bookings = [created, ...bookings];
      return [200, created];
    });
    mock.onGet(/\/api\/bookings$/).reply(() => [200, { items: bookings }]);
    mock.onGet(/\/api\/bookings\/([^/]+)$/).reply(({ url }) => {
      const id = url?.match(/\/api\/bookings\/([^/]+)$/)?.[1];
      const found = bookings.find((b) => b.id === id) || null;
      return [200, found];
    });
    mock.onPatch(/\/api\/bookings\/([^/]+)\/approve$/).reply(({ url }) => {
      const id = url?.match(/\/api\/bookings\/([^/]+)\/approve$/)?.[1];
      bookings = bookings.map((b) => (b.id === id ? { ...b, status: 'APPROVED' } : b));
      return [200, bookings.find((b) => b.id === id)];
    });
    mock.onPatch(/\/api\/bookings\/([^/]+)\/reject$/).reply(({ url }) => {
      const id = url?.match(/\/api\/bookings\/([^/]+)\/reject$/)?.[1];
      bookings = bookings.map((b) => (b.id === id ? { ...b, status: 'REJECTED' } : b));
      return [200, bookings.find((b) => b.id === id)];
    });
    mock.onPatch(/\/api\/bookings\/([^/]+)\/cancel$/).reply(({ url }) => {
      const id = url?.match(/\/api\/bookings\/([^/]+)\/cancel$/)?.[1];
      bookings = bookings.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b));
      return [200, bookings.find((b) => b.id === id)];
    });

    // Venues
    mock.onGet(/\/api\/venues$/).reply(() => [200, { items: venues }]);
    mock.onGet(/\/api\/venues\/([^/]+)$/).reply(({ url }) => {
      const id = url?.match(/\/api\/venues\/([^/]+)$/)?.[1];
      const found = venues.find((v) => v.id === id) || null;
      return [200, found];
    });
    mock.onGet(/\/api\/venues\/([^/]+)\/calendar$/).reply(({ url }) => {
      const id = url?.match(/\/api\/venues\/([^/]+)\/calendar$/)?.[1];
      return [200, { id, days: [] }];
    });
    mock.onGet(/\/api\/venues\/([^/]+)\/reviews$/).reply(({ url }) => {
      const id = url?.match(/\/api\/venues\/([^/]+)\/reviews$/)?.[1];
      return [200, { venueId: id, items: [] }];
    });
    mock.onPost(/\/api\/venues$/).reply(({ data }) => {
      const payload = JSON.parse(data || '{}');
      const created = { id: 'v' + (venues.length + 1), ...payload };
      venues = [created, ...venues];
      return [200, created];
    });
    mock.onPatch(/\/api\/venues\/([^/]+)$/).reply(({ url, data }) => {
      const id = url?.match(/\/api\/venues\/([^/]+)$/)?.[1];
      const payload = JSON.parse(data || '{}');
      venues = venues.map((v) => (v.id === id ? { ...v, ...payload } : v));
      return [200, venues.find((v) => v.id === id)];
    });
    mock.onPost(/\/api\/venues\/([^/]+)\/availability$/).reply(() => [200, { ok: true }]);
    mock.onDelete(/\/api\/venues\/([^/]+)\/availability$/).reply(() => [200, { ok: true }]);

    // Notifications
    mock.onGet(/\/api\/notifications$/).reply(() => [200, { items: notifications }]);
    mock.onPatch(/\/api\/notifications\/([^/]+)$/).reply(({ url }) => {
      const id = url?.match(/\/api\/notifications\/([^/]+)$/)?.[1];
      notifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      return [200, notifications.find((n) => n.id === id)];
    });
  })();
}


