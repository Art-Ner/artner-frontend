export const HOME_REVALIDATE_SECONDS = 300;

export type HomeShow = {
  id: string;
  title: string;
  dateRange: string;
  venueName: string;
};

export type HomeData = {
  shows: HomeShow[];
  ranking: Array<{ id: string }>;
  closingSoon: Array<{ id: string }>;
};

export function getHomeData(): HomeData {
  return {
    shows: [
      { id: 's1', title: '뮤지컬 ARTner', dateRange: '10.10~10.20', venueName: '아트홀 A' },
      { id: 's2', title: '콘서트 Night', dateRange: '10.12 19:30', venueName: '라이브홀 B' },
    ],
    ranking: [{ id: 's1' }, { id: 's2' }],
    closingSoon: [{ id: 's2' }],
  };
}


