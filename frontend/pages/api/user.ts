import { NextRouter } from 'next/router';
import { storeAuthToken } from './session';

const port = process.env.port || 4000;

export async function doRegister(
  event: React.FormEvent<HTMLFormElement>,
  router: NextRouter | string[],
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  event.preventDefault(); // FOR DEBUGGING
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

  if (res.ok) {
    console.log('Successful registration');
    router.push('/user/login');
  } else {
    console.error(data.message);
    setError(data.message);
  }
}

export async function doLogin(
  event: React.FormEvent<HTMLFormElement>,
  router: NextRouter | string[],
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  event.preventDefault(); // FOR DEBUGGING
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
    console.log('Successful login');
    storeAuthToken(data.token);
    router.push('/user/home');
  } else {
    console.error('Login failed');
    setError(data.message);
  }
}
