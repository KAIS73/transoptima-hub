import { PrismaClient } from '@prisma/client';
import logger from './logger.js';

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('✅ Database connected successfully');
  } catch (err) {
    logger.error(`❌ Database connection error: ${err.message}`);
    process.exit(1);
  }
};

export default prisma;