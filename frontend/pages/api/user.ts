import { NextRouter } from 'next/router';
import { getAuthToken, storeAuthToken } from './session';
import { Dispatch } from 'react';
import { userLoginRequest, userRegisterRequest } from '../../types/user';
import { apiUrl } from '../../data/constants';

export async function doRegister(
  req: userRegisterRequest,
  router: NextRouter,
  setError: Dispatch<React.SetStateAction<string | null>>,
  token: string
) {
  const res = await fetch(`${apiUrl}/user/register?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  const data = await res.json();

  if (res.ok) router.push('/user/login');
  else setError(data.message);
}

export async function doLogin(
  req: userLoginRequest,
  router: NextRouter,
  setError: Dispatch<React.SetStateAction<string | null>>
) {
  const res = await fetch(`${apiUrl}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  const data = await res.json();

  if (res.ok) {
    storeAuthToken(data.token);
    if (data.role === 'mentee') router.push('/mentee/home');
    else if (data.role === 'admin') router.push('/admin/home');
  } else {
    setError(data.message);
  }
}

export async function getUserProfile() {
  const res = await fetch(`${apiUrl}/user/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    console.error(data.message);
  }
}

export async function doForgotPassword(
  email: string,
  setError: Dispatch<React.SetStateAction<string | null>>,
  setSuccess: Dispatch<React.SetStateAction<string | null>>
) {
  try {
    const res = await fetch(`${apiUrl}/user/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Something went wrong.');
    } else {
      setSuccess('Reset email sent! Check your inbox.');
    }
  } catch (err) {
    console.error('Forgot password error:', err);
    setError('Server error. Try again later.');
  }
}
