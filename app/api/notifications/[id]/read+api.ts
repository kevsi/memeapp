import { ensureDemoData, getDb, markOneRead } from '@/lib/db';

export async function POST(request: Request, { id }: Record<string, string>) {
  try {
    const db = getDb();
    ensureDemoData(db);
    if (!markOneRead(db, id)) {
      return Response.json({ error: 'notification introuvable' }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.info('[api/notifications/:id/read] échec:', err);
    return Response.json({ error: 'base indisponible' }, { status: 500 });
  }
}
