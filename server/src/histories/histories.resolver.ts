import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma.service";

import { CreateHistoryInput } from "./interfaces/create-history.input";
import { HistoryModel } from "./interfaces/history.model";
import { UpdateHistoryInput } from "./interfaces/update-history.input";
@Resolver(() => CreateHistoryInput)
export class HistoriesResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [HistoryModel], { name: "histories", nullable: true })
  async getHistories() {
    return this.prismaService.history.findMany();
  }

  @Query(() => HistoryModel, { name: "history", nullable: true })
  async getHistory(
    @Args({ name: "historyId", type: () => Number }) historyId: number,
  ) {
    return this.prismaService.history.findFirst({
      where: {
        id: historyId,
      },
    });
  }

  @Mutation(() => HistoryModel)
  async createHistory(@Args("input") input: CreateHistoryInput) {
    return this.prismaService.history.create({
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
}
