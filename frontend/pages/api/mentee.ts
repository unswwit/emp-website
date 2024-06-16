import { apiUrl } from '../../data/constants';
import { hoursRequest } from '../../types/hours';
import { getAuthToken } from './session';

export async function getMenteeHours() {
  const res = await fetch(`${apiUrl}/mentee/view-hours`, {
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
    throw new Error(data.message);
  }
}

export async function sendMenteeHours(req: hoursRequest) {
  const res = await fetch(`${apiUrl}/mentee/request-hours`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(req),
  });

  const data = await res.json();

  if (res.ok) {
    return data.message;
  } else {
    console.error(data.message);
    throw new Error(data.message);
  }
}
