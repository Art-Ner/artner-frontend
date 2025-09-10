import { api } from '@/lib/api';

const BASE = '/api/venues';

export async function fetchVenues() {
  const res = await api.get(BASE, { params: undefined });
  return res.data;
}

export async function fetchVenueDetail(venueId: string) {
  const res = await api.get(`${BASE}/${venueId}`);
  return res.data;
}

export async function fetchVenueCalendar(venueId: string) {
  const res = await api.get(`${BASE}/${venueId}/calendar`);
  return res.data;
}

export async function fetchVenueReviews(venueId: string) {
  const res = await api.get(`${BASE}/${venueId}/reviews`);
  return res.data;
}

export async function createVenue(payload: unknown) {
  const res = await api.post(BASE, payload);
  return res.data;
}

export async function updateVenue(venueId: string, payload: unknown) {
  const res = await api.patch(`${BASE}/${venueId}`, payload);
  return res.data;
}

// Note: availability endpoints
export async function addAvailability(venueId: string, payload: unknown) {
  const res = await api.post(`${BASE}/${venueId}/availability`, payload);
  return res.data;
}

export async function deleteAvailability(venueId: string, payload: unknown) {
  const res = await api.delete(`${BASE}/${venueId}/availability`, { data: payload as any });
  return res.data;
}
