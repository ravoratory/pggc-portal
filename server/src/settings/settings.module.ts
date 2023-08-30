import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { SettingsResolver } from "./settings.resolver";

@Module({
  providers: [SettingsResolver, PrismaService],
})
export class SettingsModule {}
