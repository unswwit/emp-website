import { NextRouter } from 'next/router';
import { getAuthToken, storeAuthToken } from './session';
import { Dispatch, FormEvent } from 'react';

const port = process.env.port || 4000;

export async function doRegister(
  event: FormEvent<HTMLFormElement>,
  router: NextRouter,
  setError: Dispatch<React.SetStateAction<string | null>>
) {
  event.preventDefault();
  const e = event.currentTarget;

  const res = await fetch(`http://localhost:${port}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: e.email.value,
      zid: e.zid.value,
      firstName: e.fname.value,
      lastName: e.lname.value,
      password: e.password.value,
    }),
  });
  const data = await res.json();

  if (res.ok) router.push('/user/login');
  else setError(data.message);
}

export async function doLogin(
  event: FormEvent<HTMLFormElement>,
  router: NextRouter,
  setError: Dispatch<React.SetStateAction<string | null>>
) {
  event.preventDefault();
  const e = event.currentTarget;
  const userId = e.userId.value;

  const res = await fetch(`http://localhost:${port}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      password: e.password.value,
    }),
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
  const res = await fetch(`http://localhost:${port}/user/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuthToken()}`,
    },
  });

  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    console.error(data.message);
    throw new Error(data.message);
  }
}
