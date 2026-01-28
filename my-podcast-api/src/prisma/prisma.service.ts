import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as path from 'node:path';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const prismaClientPath = path.join(process.cwd(), 'generated', 'prisma', 'client.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
type PrismaClientType = import('../../generated/prisma').PrismaClient;
const { PrismaClient } = require(prismaClientPath) as {
  PrismaClient: new (options: { adapter: PrismaPg }) => PrismaClientType;
};

const prismaPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg(prismaPool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
