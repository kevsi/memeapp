import { ensureDemoData, getDb, listNotifications } from '@/lib/db';

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get('userId');
  if (!userId) {
    return Response.json({ error: 'userId manquant' }, { status: 400 });
  }
  try {
    const db = getDb();
    ensureDemoData(db);
    const rows = listNotifications(db, userId);
    return Response.json({
      items: rows.map((r) => ({ ...r, isRead: r.isRead === 1 })),
    });
  } catch (err) {
    console.info('[api/notifications] échec:', err);
    return Response.json({ error: 'base indisponible' }, { status: 500 });
  }
}
