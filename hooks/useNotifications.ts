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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/notifications?userId=demo-user`);
      const json = await res.json();
      setNotifications(json.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  }, [fetchNotifications]);

  const markAllRead = useCallback(async () => {
    try {
      await fetch('/api/notifications/mark-read', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 'demo-user' }) });
      setNotifications((s) => s.map(n => ({ ...n, isRead: true })));
    } catch (err) { console.error(err); }
  }, []);

  const markOneRead = useCallback(async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      setNotifications((s) => s.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  return { notifications, loading, refreshing, refresh, markAllRead, markOneRead };
}
