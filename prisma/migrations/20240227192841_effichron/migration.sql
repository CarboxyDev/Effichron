-- CreateTable
CREATE TABLE "EFFICHRON_Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "EFFICHRON_Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EFFICHRON_Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EFFICHRON_Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EFFICHRON_User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EFFICHRON_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EFFICHRON_VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "EFFICHRON_SessionLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionSnapshot" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EFFICHRON_SessionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EFFICHRON_Task" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EFFICHRON_Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EFFICHRON_Account_userId_idx" ON "EFFICHRON_Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EFFICHRON_Account_provider_providerAccountId_key" ON "EFFICHRON_Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "EFFICHRON_Session_sessionToken_key" ON "EFFICHRON_Session"("sessionToken");

-- CreateIndex
CREATE INDEX "EFFICHRON_Session_userId_idx" ON "EFFICHRON_Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EFFICHRON_User_email_key" ON "EFFICHRON_User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EFFICHRON_VerificationToken_token_key" ON "EFFICHRON_VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "EFFICHRON_VerificationToken_identifier_token_key" ON "EFFICHRON_VerificationToken"("identifier", "token");
