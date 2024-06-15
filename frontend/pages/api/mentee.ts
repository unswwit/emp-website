import { hoursRequest } from '../../types/hours';
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
    console.error(data.message);
  }
}

export async function sendMenteeHours(req: hoursRequest) {
  const res = await fetch(`http://localhost:${port}/mentee/request-hours`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuthToken()}`,
    },
    body: JSON.stringify(req),
  });

  const data = await res.json();

  if (res.ok) {
    return data.message;
  } else {
    console.error(data.message);
  }
}
