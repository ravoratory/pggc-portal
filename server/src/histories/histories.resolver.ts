/* eslint-disable consistent-return */
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PrismaService } from "src/prisma.service";
import { User } from "src/users/interfaces/user.model";
import { CurrentUser } from "src/users/user.decorator";

import { CreateHistoryInput } from "./interfaces/create-history.input";
import { HistoryModel } from "./interfaces/history.model";
import { UpdateHistoryInput } from "./interfaces/update-history.input";


const pubsub = new PubSub();

@Resolver(() => CreateHistoryInput)
export class HistoriesResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [HistoryModel], { name: "histories", nullable: true })
  async getHistories(@CurrentUser() user: User) {
    return this.prismaService.history.findMany({
      include: {
        team: true,
        problem: true,
      },
      where: {
        teamId: user.role === "Admin" ? undefined : user.team.id,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => HistoryModel, { name: "history", nullable: true })
  async getHistory(
    @Args({ name: "historyId", type: () => Number }) historyId: number,
    @CurrentUser() user: User,
  ) {
    const history = await this.prismaService.history.findFirst({
      where: {
        id: historyId,
      },
      include: {
        team: true,
        problem: true,
      },
    });
    if (history.team.id !== user.team.id) return;
    return history;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => HistoryModel)
  async createHistory(@Args("input") input: CreateHistoryInput) {
    const history = await this.prismaService.history.create({
      data: {
        team: {
          connect: {
            id: input.teamId,
          },
        },
        problem: {
          connect: {
            id: input.problemId,
          },
        },
        score: input.score,
        status: input.status,
      },
    });
    pubsub.publish("scoreboard", { scoreboard: history });
    return history;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => HistoryModel)
  async updateHistory(@Args("input") input: UpdateHistoryInput) {
    return this.prismaService.history.update({
      where: {
        id: input.id,
      },
      data: {
        team: {
          connect: {
            id: input.teamId,
          },
        },
        problem: {
          connect: {
            id: input.problemId,
          },
        },
        score: input.score,
        status: input.status,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => HistoryModel)
  async deleteHistory(
    @Args({ name: "historyId", type: () => Number }) historyId: number,
  ) {
    return this.prismaService.history.delete({
      where: {
        id: historyId,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [HistoryModel])
  async dashBoard() {
    return this.prismaService.history.findMany({
      where: {
        createdAt: {
          lte: new Date("2023/09/09 7:00:00"),
        },
        OR: [{ status: "correct" }, { status: "partial" }],
      },
      include: {
        team: true,
        problem: true,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [HistoryModel])
  async rankingBoard(
    @Args({ name: "teamId", type: () => Number }) teamId: number,
  ) {
    return this.prismaService.history.findMany({
      where: {
        createdAt: {
          lte: new Date("2023/09/09 7:00:00"),
        },
        teamId,
        OR: [{ status: "correct" }, { status: "partial" }],
      },
      include: {
        team: true,
        problem: true,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Subscription(() => [HistoryModel])
  async scoreboard() {
    return pubsub.asyncIterator("scoreboard");
  }
}
