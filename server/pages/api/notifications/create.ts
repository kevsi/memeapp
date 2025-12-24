import { pushNotification } from '@/server/lib/notifications';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { userId, type, title, message, memeId } = req.body;
    if (!userId || !type || !title) return res.status(400).json({ error: 'missing_fields' });

    const created = await pushNotification({ userId, type, title, message: message || '', memeId });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error' });
  }
}
