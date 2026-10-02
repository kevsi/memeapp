import { DEMO_USER, ensureDemoData, getDb, getUserStat } from '@/lib/db';

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get('userId') ?? DEMO_USER;
  try {
    const db = getDb();
    ensureDemoData(db);
    const stat = getUserStat(db, userId);
    if (!stat) {
      return Response.json({ error: 'stats introuvables' }, { status: 404 });
    }
    return Response.json(stat);
  } catch (err) {
    console.info('[api/stats] échec:', err);
    return Response.json({ error: 'base indisponible' }, { status: 500 });
  }
}
