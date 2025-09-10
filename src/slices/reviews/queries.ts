import { api } from '@/lib/api';

// Venue reviews
export async function fetchVenueReviews(venueId: string) {
  const res = await api.get(`/api/bff/venues/${venueId}/reviews`);
  return res.data;
}

export async function createVenueReview(venueId: string, payload: { rate: number; content: string }) {
  const res = await api.post(`/api/bff/venues/${venueId}/reviews`, payload);
  return res.data;
}

export async function updateVenueReview(venueId: string, payload: { rate: number; content: string }) {
  const res = await api.put(`/api/bff/venues/${venueId}/reviews`, payload);
  return res.data;
}

export async function deleteVenueReview(venueId: string) {
  const res = await api.delete(`/api/bff/venues/${venueId}/reviews`);
  return res.data;
}

// User-to-user (artist) reviews
export async function fetchUserReviews(artistId: string) {
  const res = await api.get(`/api/bff/artists/${artistId}/reviews`);
  return res.data;
}

export async function createUserReview(artistId: string, payload: { content: string }) {
  const res = await api.post(`/api/bff/artists/${artistId}/reviews`, payload);
  return res.data;
}

export async function updateUserReview(artistId: string, payload: { content: string }) {
  const res = await api.patch(`/api/bff/artists/${artistId}/reviews`, payload);
  return res.data;
}

export async function deleteUserReview(artistId: string) {
  const res = await api.delete(`/api/bff/artists/${artistId}/reviews`);
  return res.data;
}


