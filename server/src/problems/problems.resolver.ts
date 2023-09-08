import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PrismaService } from "src/prisma.service";
import { CurrentUser } from "src/users/user.decorator";

import { CreateProblemInput } from "./interfaces/create-problem.input";
import { Problem } from "./interfaces/problem.model";
import { ProblemsReponse } from "./interfaces/problem.response";
import { UpdateProblemInput } from "./interfaces/update-problem.input";

@Resolver(() => Problem)
export class ProblemsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [ProblemsReponse], { name: "problems", nullable: true })
  async getProblems(@CurrentUser() user: User) {
    const started =
      Date.now().toLocaleString("JST") >=
      new Date("2023/09/09 13:00").toLocaleString("JST");
    const problems = await this.prismaService.problem.findMany({
      where: {
        difficulty: started || user.role === "Admin" ? undefined : "Tutorial",
      },
    });
    // eslint-disable-next-line no-return-assign
    return problems.map(async (p: ProblemsReponse) => {
      // eslint-disable-next-line no-param-reassign
      p.isSolved = !!(await this.prismaService.history.findFirst({
        where: {
          problemId: p.id,
          teamId: user?.teamId ?? 0,
        },
      }));
      return p;
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Problem, { name: "problem", nullable: true })
  async getProblem(
    @Args({ name: "problemId", type: () => String }) problemId: string,
  ) {
    return this.prismaService.problem.findFirst({
      where: {
        title: problemId,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Problem)
  async createProblem(@Args("input") input: CreateProblemInput) {
    return this.prismaService.problem.create({
      data: {
        title: input.title,
        content: input.content,
        difficulty: input.difficulty,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Problem)
  async updateProblem(@Args("input") input: UpdateProblemInput) {
    return this.prismaService.problem.update({
      where: {
        title: input.title,
      },
      data: {
        title: input.title,
        content: input.content,
        difficulty: input.difficulty,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Problem)
  async deleteProblem(
    @Args({ name: "problemId", type: () => String }) problemId: string,
  ) {
    return this.prismaService.problem.delete({
      where: {
        title: problemId,
      },
    });
  }
}
