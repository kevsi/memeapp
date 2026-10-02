-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "memeId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserStat" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "followersDelta" INTEGER NOT NULL,
    "defisWon" INTEGER NOT NULL,
    "defisDelta" INTEGER NOT NULL,
    "streakDays" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");
