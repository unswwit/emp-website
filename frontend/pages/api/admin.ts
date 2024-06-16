import { apiUrl } from '../../data/constants';
import { hoursApproveRequest } from '../../types/hours';
import { getAuthToken } from './session';

export async function getAllMenteeHours() {
  const res = await fetch(`${apiUrl}/admin/view-hours`, {
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

export async function approveMenteeHours(req: hoursApproveRequest) {
  const res = await fetch(`${apiUrl}/admin/approve-hours`, {
    method: 'PATCH',
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
    return data.message;
  }
}

export const handleInviteSubmit = async (
  file: File | null,
  setMessage: (message: string) => void
) => {
  if (!file) {
    setMessage('Please upload a CSV file');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${apiUrl}/admin/invite`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to send invitations');
    }

    const data = await response.text();
    setMessage(data);
  } catch (error) {
    setMessage('An error occurred');
    console.error(error);
  }
};
