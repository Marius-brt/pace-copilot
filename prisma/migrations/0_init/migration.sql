-- CreateEnum
CREATE TYPE "TrainingType" AS ENUM ('STRENGTH', 'TRAIL_RUNNING', 'ROAD_RUNNING', 'ROAD_CYCLING');

-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('TRAIL_RUNNING', 'ROAD_RUNNING');

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "TrainingType" NOT NULL,
    "distance" INTEGER,
    "duration" INTEGER,
    "elevationGain" INTEGER,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "GoalType" NOT NULL,
    "distance" INTEGER NOT NULL,
    "elevationGain" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "timeGoal" INTEGER,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("userId","id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "training" JSONB,
    "credits" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Goal_userId_key" ON "Goal"("userId");

