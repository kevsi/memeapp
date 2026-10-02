import { DEMO_USER, ensureDemoData, getDb, markAllRead } from '@/lib/db';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { userId?: string } | null;
  const userId = body?.userId ?? DEMO_USER;
  try {
    const db = getDb();
    ensureDemoData(db);
    markAllRead(db, userId);
    return Response.json({ ok: true });
  } catch (err) {
    console.info('[api/notifications/mark-read] échec:', err);
    return Response.json({ error: 'base indisponible' }, { status: 500 });
  }
}
