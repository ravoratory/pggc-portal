import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { HistoriesResolver } from "./histories.resolver";

@Module({
  providers: [HistoriesResolver, PrismaService],
})
export class HistoriesModule {}
