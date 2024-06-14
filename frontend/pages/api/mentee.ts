import { getAuthToken } from './session';

const port = process.env.port || 4000;

export async function getMenteeInfo() {
  const token = await getAuthToken();
  const res = await fetch(`http://localhost:${port}/mentee/view-hours`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (res.ok) {
    console.log(data);
  } else {
    console.log(data);
  }
}
