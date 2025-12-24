import { listNotifications } from '@/server/lib/notifications';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, limit = '20', cursor } = req.query;
    if (!userId || typeof userId !== 'string') return res.status(400).json({ error: 'userId required' });

    const { items, nextCursor } = await listNotifications(userId, Number(limit), cursor as string | undefined);

    res.status(200).json({ items, nextCursor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error' });
  }
}
