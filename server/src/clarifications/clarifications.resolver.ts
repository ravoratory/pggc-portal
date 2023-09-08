import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateClarificationInput } from "src/clarifications/interfaces/create-clarification.input";
import { UpdateClarificationInput } from "src/clarifications/interfaces/update-clarification.input";
import { PrismaService } from "src/prisma.service";
import { User } from "src/users/interfaces/user.model";
import { CurrentUser } from "src/users/user.decorator";

import { ClarificationModel } from "./interfaces/clarification.model";


@Resolver(() => ClarificationModel)
export class ClarificationsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [ClarificationModel], { name: "clarifications", nullable: true })
  async getClarifications(@CurrentUser() user: User) {
    if (user.role === "Admin")
      return this.prismaService.clarification.findMany({
        include: {
          team: true,
          problem: true,
        },
      });
    return this.prismaService.clarification.findMany({
      where: {
        OR: [{ teamId: user.team.id }],
      },
      include: {
        team: true,
        problem: true,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ClarificationModel, { name: "clarification", nullable: true })
  async getClarification(
    @Args({ name: "clarificationId", type: () => Int }) clarificationId: number,
    @CurrentUser() user: User,
  ) {
    return this.prismaService.clarification.findFirst({
      where: {
        id: clarificationId,
        teamId: user.role === "Admin" ? undefined : user.team.id,
      },
      include: {
        team: true, problem: true
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ClarificationModel)
  async createClarification(@Args("input") input: CreateClarificationInput) {
    return this.prismaService.clarification.create({
      data: {
        question: input.question,
        answer: input.answer,
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
        isPublic: input.isPublic,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ClarificationModel)
  async updateClarification(@Args("input") input: UpdateClarificationInput) {
    return this.prismaService.clarification.update({
      where: {
        id: input.id,
      },
      data: {
        answer: input.answer,
        isPublic: input.isPublic,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ClarificationModel)
  async deleteClarification(
    @Args({ name: "clarificationId", type: () => Int }) clarificationId: number,
  ) {
    return this.prismaService.clarification.delete({
      where: {
        id: clarificationId,
      },
    });
  }
}
