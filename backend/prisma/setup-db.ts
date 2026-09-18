import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const provider = process.env.DATABASE_PROVIDER || (process.env.DATABASE_URL?.startsWith('file:') ? 'sqlite' : 'mysql');

console.log(`[Database Setup] Configuring Prisma for provider: ${provider}`);

const rootDir = path.resolve(__dirname, '..');
const prismaDir = path.join(rootDir, 'prisma');

const targetSchema = path.join(prismaDir, 'schema.prisma');
const sqliteSchema = path.join(prismaDir, 'schema.sqlite.prisma');

if (provider === 'sqlite') {
  if (fs.existsSync(sqliteSchema)) {
    const sqliteContent = fs.readFileSync(sqliteSchema, 'utf-8');
    fs.writeFileSync(targetSchema, sqliteContent, 'utf-8');
    console.log('[Database Setup] Replaced schema.prisma with SQLite schema.');
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
