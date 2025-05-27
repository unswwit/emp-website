import type { NextApiRequest, NextApiResponse } from 'next';
import { apiUrl } from '../../data/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Backend gets request to reset password
  try {
    const backendRes = await fetch(`${apiUrl}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
