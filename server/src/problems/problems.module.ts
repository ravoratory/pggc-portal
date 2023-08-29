import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { ProblemsResolver } from "./problems.resolver";

@Module({
  providers: [ProblemsResolver, PrismaService],
})
export class ProblemsModule {}
