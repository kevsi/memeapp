import prisma from './prisma';

export type NotificationCreate = {
  userId: string;
  type: string;
  title: string;
  message: string;
  memeId?: string | null;
};

export async function pushNotification(payload: NotificationCreate) {
  return prisma.notification.create({ data: payload });
}

export async function listNotifications(userId: string, limit = 20, cursor?: string) {
  const where: any = { userId };
  const items = await prisma.notification.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit + 1,
    skip: cursor ? 1 : 0,
    ...(cursor ? { cursor: { id: cursor } } : {}),
  });

  let nextCursor: string | null = null;
  if (items.length > limit) {
    const next = items.pop();
    nextCursor = next!.id;
  }

  return { items, nextCursor };
}

export async function markAllRead(userId: string) {
  return prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
}

export async function markOneRead(notificationId: string) {
  return prisma.notification.update({ where: { id: notificationId }, data: { isRead: true } });
}
