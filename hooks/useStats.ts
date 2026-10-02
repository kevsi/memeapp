import { useEffect, useState } from 'react';

export type UserStats = {
  followers: number;
  followersDelta: number;
  defisWon: number;
  defisDelta: number;
  streakDays: number;
};

// Stats du profil — GET /api/stats (lib/db.ts côté serveur).
// En cas d'indisponibilité : null → l'UI affiche « — » (jamais un chiffre fabriqué).
// Pattern promise-chain (callbacks) : aucun setState synchrone dans l'effect,
// conforme react-hooks/set-state-in-effect.
export default function useStats() {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/stats?userId=demo-user')
      .then((res) => {
        if (!res.ok) {
          if (__DEV__) console.info(`[stats] API injoignable (${res.status})`);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled && data) setStats(data as UserStats);
      })
      .catch((err) => {
        if (__DEV__) console.info('[stats] échec du chargement', err);
        if (!cancelled) setStats(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}
