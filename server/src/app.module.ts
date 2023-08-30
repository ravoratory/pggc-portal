import * as path from "node:path";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClarificationsModule } from "./clarifications/clarifications.module";
import { HistoriesModule } from "./histories/histories.module";
import { PrismaService } from "./prisma.service";
import { ProblemsModule } from "./problems/problems.module";
import { SettingsModule } from "./settings/settings.module";
import { TeamsModule } from "./teams/teams.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV === "development",
      autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
    }),
    ProblemsModule,
    UsersModule,
    TeamsModule,
    SettingsModule,
    HistoriesModule,
    ClarificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
