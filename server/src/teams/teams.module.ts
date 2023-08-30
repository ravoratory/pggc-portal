import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { TeamsResolver } from "./teams.resolver";

@Module({
  providers: [TeamsResolver, PrismaService],
})
export class TeamsModule {}
