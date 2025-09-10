import { api } from '@/lib/api';

const BASE = '/api/bff/artists';

export async function searchArtists(keyword?: string) {
  const res = await api.get(BASE, { params: keyword ? { keyword } : undefined });
  return res.data;
}

export async function fetchArtistProfile(artistId: string) {
  const res = await api.get(`${BASE}/${artistId}/profile`);
  return res.data;
}

export async function fetchArtistFilmography(artistId: string) {
  const res = await api.get(`${BASE}/${artistId}/filmography`);
  return res.data;
}

export async function fetchArtistConcertHistory(artistId: string) {
  const res = await api.get(`${BASE}/${artistId}/concert_history`);
  return res.data;
}
