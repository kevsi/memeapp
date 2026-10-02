import { useCallback, useEffect, useState } from 'react';

type Notification = {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  memeId?: string | null;
  isRead: boolean;
  createdAt: string;
};

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // État initial = en chargement : aucun setState synchrone dans l'effect
  // (react-hooks/set-state-in-effect).
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchNotifications = useCallback(() => {
    return fetch(`/api/notifications?userId=demo-user`)
      .then((res) => {
        // Réponse non-JSON (404 HTML…) : on n'interprète pas le corps, pas d'exception
        if (!res.ok) {
          if (__DEV__) console.info(`[notifications] API injoignable (${res.status})`);
          setNotifications([]);
          setError(true);
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (json) {
          setNotifications(json.items || []);
          setError(false);
        }
      })
      .catch((err) => {
        // Log détaillé réservé au dev : console.error déclenche le toast LogBox
        if (__DEV__) console.info('[notifications] échec du chargement', err);
        setNotifications([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  }, [fetchNotifications]);

  const markAllRead = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user' }),
      });
      if (!res.ok) {
        if (__DEV__) console.info(`[notifications] mark-read refusé (${res.status})`);
        return;
      }
      setNotifications((s) => s.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      if (__DEV__) console.info('[notifications] mark-read échoué', err);
    }
  }, []);

  const markOneRead = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      if (!res.ok) {
        if (__DEV__) console.info(`[notifications] read refusé (${res.status})`);
        return;
      }
      setNotifications((s) => s.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    } catch (err) {
      if (__DEV__) console.info('[notifications] read échoué', err);
    }
  }, []);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  return { notifications, loading, refreshing, error, refresh, markAllRead, markOneRead };
}
