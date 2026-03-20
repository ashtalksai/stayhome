import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const getClient = () => {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set")
  }
  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

const globalForPrisma = global as typeof global & { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? getClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
