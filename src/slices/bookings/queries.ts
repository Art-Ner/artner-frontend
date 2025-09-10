import { api } from '@/lib/api';

const BASE = '/api/bookings';

export async function createBooking(payload: unknown) {
  const res = await api.post(BASE, payload);
  return res.data;
}

export async function fetchBookings() {
  const res = await api.get(BASE);
  return res.data;
}

export async function fetchBookingDetail(bookingId: string) {
  const res = await api.get(`${BASE}/${bookingId}`);
  return res.data;
}

export async function approveBooking(bookingId: string) {
  const res = await api.patch(`${BASE}/${bookingId}/approve`);
  return res.data;
}

export async function rejectBooking(bookingId: string) {
  const res = await api.patch(`${BASE}/${bookingId}/reject`);
  return res.data;
}

export async function cancelBooking(bookingId: string) {
  const res = await api.patch(`${BASE}/${bookingId}/cancel`);
  return res.data;
}
