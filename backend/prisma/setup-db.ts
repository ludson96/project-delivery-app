import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const rootDir = path.resolve(__dirname, '..');
const prismaDir = path.join(rootDir, 'prisma');

const targetSchema = path.join(prismaDir, 'schema.prisma');
const mysqlSchema = path.join(prismaDir, 'schema.mysql.prisma');
const sqliteSchema = path.join(prismaDir, 'schema.sqlite.prisma');

const dbUrl = process.env.DATABASE_URL || '';
const provider = process.env.DATABASE_PROVIDER || (dbUrl.startsWith('file:') ? 'sqlite' : 'mysql');

console.log(`[Database Setup] Configuring Prisma for provider: ${provider}`);

if (provider === 'sqlite') {
  if (fs.existsSync(sqliteSchema)) {
    const sqliteContent = fs.readFileSync(sqliteSchema, 'utf-8');
    fs.writeFileSync(targetSchema, sqliteContent, 'utf-8');
    console.log('[Database Setup] Configured schema.prisma for SQLite.');
  }
} else {
  if (fs.existsSync(mysqlSchema)) {
    const mysqlContent = fs.readFileSync(mysqlSchema, 'utf-8');
    fs.writeFileSync(targetSchema, mysqlContent, 'utf-8');
    console.log('[Database Setup] Configured schema.prisma for MySQL.');
  }
}

try {
  console.log('[Database Setup] Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit', cwd: rootDir });

  console.log('[Database Setup] Pushing schema to database...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', cwd: rootDir });

  console.log('[Database Setup] Running database seeds...');
  execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit', cwd: rootDir });

  console.log('[Database Setup] Successfully configured database!');
} catch (error) {
  console.error('[Database Setup] Error during DB setup:', error);
  process.exit(1);
}
