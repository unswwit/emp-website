import { getAuthToken } from './session';

const port = process.env.port || 4000;

export async function getMenteeHours() {
  const res = await fetch(`http://localhost:${port}/mentee/view-hours`, {
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
    console.log(data.message);
  }
}
