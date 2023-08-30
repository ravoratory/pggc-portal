import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma.service";

import { CreateProblemInput } from "./interfaces/create-problem.input";
import { Problem } from "./interfaces/problem.model";
import { UpdateProblemInput } from "./interfaces/update-problem.input";

@Resolver(() => CreateProblemInput)
export class ProblemsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Problem], { name: "problems", nullable: true })
  async getProblems() {
    return this.prismaService.problem.findMany();
  }

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
