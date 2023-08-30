import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { ClarificationsResolver } from "./clarifications.resolver";

@Module({
  providers: [ClarificationsResolver, PrismaService],
})
export class ClarificationsModule {}
