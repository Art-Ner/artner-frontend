import { api } from '@/lib/api';

export async function createArtistProfile(payload: {
  headline?: string;
  bio?: string;
  url_primary?: string;
  url_secondary?: string;
  url_tertiary?: string;
}) {
  const res = await api.post('/api/bff/users/artist-profile', payload);
  return res.data;
}

export async function createVenueAdminProfile(payload: {
  business_reg_number: string;
}) {
  const res = await api.post('/api/bff/users/venue-admin-profile', payload);
  return res.data;
}

export async function updateMe(payload: { email?: string; username?: string }) {
  const res = await api.put('/api/bff/users/me', payload);
  return res.data;
}

export async function updateMyProfileImage(file: File) {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post('/api/bff/users/me/profile-image', form);
  return res.data;
}
