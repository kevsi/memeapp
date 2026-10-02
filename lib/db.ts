import { DatabaseSync } from 'node:sqlite';

// Accès SQLite via le builtin Node (node:sqlite) :
// les API routes Expo ne peuvent pas bundler de binaire natif (limitation
// documentée — better-sqlite3/Prisma client impossible ici). Prisma reste
// propriétaire du schéma et des migrations (prisma/schema.prisma), le
// runtime se limite aux requêtes de ce fichier.

export type NotificationRow = {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  memeId: string | null;
  isRead: number;
  createdAt: string;
};

export type UserStatRow = {
  userId: string;
  username: string;
  followers: number;
  followersDelta: number;
  defisWon: number;
  defisDelta: number;
  streakDays: number;
};

export const DEMO_USER = 'demo-user';

let cached: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!cached) {
    const url = process.env.DATABASE_URL ?? 'file:./dev.db';
    cached = new DatabaseSync(url.replace(/^file:/, ''));
  }
  return cached;
}

// Seed paresseux : injecte les données démo si les tables sont vides.
export function ensureDemoData(db: DatabaseSync = getDb()): void {
  const count = db
    .prepare('SELECT COUNT(*) AS n FROM "Notification" WHERE "userId" = ?')
    .get(DEMO_USER) as { n: number };
  if (count.n === 0) {
    const insert = db.prepare(
      'INSERT INTO "Notification" (id, userId, type, title, message, memeId) VALUES (?, ?, ?, ?, ?, ?)',
    );
    insert.run('demo-1', DEMO_USER, 'like', 'Nouveau like', 'Kevin a liké ton meme « NO STRESS JUST VIBING »', '1');
    insert.run('demo-2', DEMO_USER, 'comment', 'Nouveau commentaire', 'Marie a commenté : « trop vrai 😂 »', '2');
    insert.run('demo-3', DEMO_USER, 'follow', 'Nouvel abonné', "Lucas s'est abonné à ton profil", null);
    insert.run('demo-4', DEMO_USER, 'streak', 'Série en danger', 'Ton streak de 7 jours expire ce soir !', null);
  }

  const stat = db
    .prepare('SELECT "userId" FROM "UserStat" WHERE "userId" = ?')
    .get(DEMO_USER);
  if (!stat) {
    db.prepare(
      'INSERT INTO "UserStat" (userId, username, followers, followersDelta, defisWon, defisDelta, streakDays) VALUES (?, ?, ?, ?, ?, ?, ?)',
    ).run(DEMO_USER, 'alexanders', 10250, 12, 9800, 8, 7);
  }
}

export function listNotifications(db: DatabaseSync, userId: string): NotificationRow[] {
  return db
    .prepare('SELECT * FROM "Notification" WHERE "userId" = ? ORDER BY "createdAt" DESC')
    .all(userId) as unknown as NotificationRow[];
}

export function markAllRead(db: DatabaseSync, userId: string): void {
  db.prepare('UPDATE "Notification" SET "isRead" = 1 WHERE "userId" = ? AND "isRead" = 0').run(userId);
}

export function markOneRead(db: DatabaseSync, id: string): boolean {
  const res = db.prepare('UPDATE "Notification" SET "isRead" = 1 WHERE "id" = ?').run(id);
  return res.changes > 0;
}

export function getUserStat(db: DatabaseSync, userId: string): UserStatRow | null {
  const row = db.prepare('SELECT * FROM "UserStat" WHERE "userId" = ?').get(userId);
  return (row as unknown as UserStatRow | undefined) ?? null;
}
