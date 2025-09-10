import { api } from '@/lib/api';

export async function loginWithKakao() {
  const res = await api.post('/api/bff/auth/kakao');
  return res.data;
}

export async function loginWithGoogle() {
  const res = await api.post('/api/bff/auth/google');
  return res.data;
}

export async function signupWithKakao() {
  const res = await api.post('/api/bff/auth/signup/kakao');
  return res.data;
}

export async function signupWithGoogle() {
  const res = await api.post('/api/bff/auth/signup/google');
  return res.data;
}

export async function logout() {
  const res = await api.post('/api/bff/auth/logout');
  return res.data;
}

export async function fetchMe() {
  const res = await api.get('/api/bff/users/me');
  return res.data;
}
