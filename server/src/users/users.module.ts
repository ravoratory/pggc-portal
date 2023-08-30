import { Module } from '@nestjs/common';
import { PrismaService } from "src/prisma.service";

import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, PrismaService],
})
export class UsersModule {}
