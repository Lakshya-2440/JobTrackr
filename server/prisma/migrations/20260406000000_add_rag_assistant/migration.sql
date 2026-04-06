-- CreateTable
CREATE TABLE "AssistantDocument" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL,
    "priority" "Priority" NOT NULL,
    "embedding" DOUBLE PRECISION[] NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AssistantDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssistantDocument_jobId_key" ON "AssistantDocument"("jobId");

-- CreateIndex
CREATE INDEX "AssistantDocument_userId_idx" ON "AssistantDocument"("userId");

-- AddForeignKey
ALTER TABLE "AssistantDocument"
ADD CONSTRAINT "AssistantDocument_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantDocument"
ADD CONSTRAINT "AssistantDocument_jobId_fkey"
FOREIGN KEY ("jobId") REFERENCES "Job"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;