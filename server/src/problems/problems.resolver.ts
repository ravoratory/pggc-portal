import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma.service";

import { CreateProblemInput } from "./interfaces/create-problem.input";
import { ProblemModel } from "./interfaces/problem.model";

@Resolver(() => ProblemModel)
export class ProblemsResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [ProblemModel], { name: "problems", nullable: true })
  async getProblems() {
    return this.prismaService.problem.findMany();
  }

  @Mutation(() => ProblemModel)
  async createProblem(@Args("input") input: CreateProblemInput) {
    return this.prismaService.problem.create({
      data: {
        title: input.title,
        content: input.content,
        difficulty: input.difficulty,
      },
    });
  }
}
